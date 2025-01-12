import { calculateShiftTimes } from "./calculateShiftTimes";
import { calculateTotalHours } from "./calculateTotalHours";
import { traverseCol } from "./traverseCol";
import { traverseRow } from "./traverseRow";

const traverseExcel = (excel) => {
  const timesheet = excel;
  const errors = [];
  const activeRows = [];
  const weekOneTotal = [];
  const weekTwoTotal = [];
  const totalHours = [];
  // why does some have UNDEFINED date?
  const twoWeeksOfDates = timesheet[12]
    .slice(6, timesheet[12].length - 2)
    .map((date) => {
      if (date instanceof Date) {
        const d = new Date(date);
        const month = d.getUTCMonth() + 1;
        const day = d.getUTCDate();

        return `${month}/${day}`;
      }
    });

  for (let x = 0; x < timesheet.length; x++) {
    const row = timesheet[x];
    const start = row[4] instanceof Date && new Date(row[4]);
    const end = row[5] instanceof Date && new Date(row[5]);

    if (row.includes("TOTAL HOURS")) {
      totalHours.push(row[row.length - 2]);
      totalHours.push(row[row.length - 1]);
    }

    if (start && end) {
      const bothWeeks = row.slice(6, row.length - 2);
      const shiftHours = calculateShiftTimes(row);

      weekOneTotal.push(row[row.length - 2]);
      weekTwoTotal.push(row[row.length - 1]);

      activeRows.push({
        start,
        end,
        idx: x + 1,
        bothWeeks,
      });

      const matchErrors = traverseRow({
        row,
        hours: shiftHours,
      });

      if (bothWeeks.every((el) => el === null)) {
        errors.push(
          `Row ${
            x + 1
          }:  No shift hours present throughout both weeks.  Please remove this row.`
        );
      }

      if (matchErrors.length) {
        matchErrors.forEach((err) => {
          errors.push(`Row ${x + 1}: ${err} `);
        });
      }
    }
  }

  traverseCol({
    activeRows,
    twoWeeksOfDates,
  }).forEach((err) => errors.push(err));

  calculateTotalHours({ weekOneTotal, weekTwoTotal, totalHours }).forEach(
    (err) => errors.push(err)
  );

  return errors;
};

export { traverseExcel };
