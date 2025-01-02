import { calculateShiftTimes } from "./calculateShiftTimes";
import { traverseRow } from "./traverseRow";

const traverseExcel = (excel) => {
  const timesheet = excel;
  const errors = [];

  for (let x = 0; x < timesheet.length; x++) {
    const start = timesheet[x][4] instanceof Date;
    const end = timesheet[x][5] instanceof Date;

    if (start && end) {
      const bothWeeks = timesheet[x].slice(6, timesheet[x].length - 3);
      const shiftHours = calculateShiftTimes(timesheet[x]);

      const matchErrors = traverseRow({
        row: timesheet[x],
        hours: shiftHours,
      });

      if (bothWeeks.every((el) => el === null)) {
        errors.push(
          `Row ${
            x + 1
          }:  No shift hours present throughout both weeks.  Please remove this row.`
        );
      }
      // find out what this is for
      if (matchErrors.length) {
        errors.push(`Row ${x + 1}: ${matchErrors} `);
      }
    }
  }

  return errors;
};

export { traverseExcel };
