import moment from "moment";
import { calculateShiftTimes } from "./calculateShiftTimes";
import { calculateTotalHours } from "./calculateTotalHours";
import { traverseCol } from "./traverseCol";
import { traverseRow } from "./traverseRow";
import { endPeriods } from "./endPeriods";
import { getDate } from "./getDate";

const traverseExcel = (excel) => {
  const timesheet = excel;
  const errors = [];
  const activeRows = [];
  const weekOneTotal = [];
  const weekTwoTotal = [];
  const totalHours = [];
  const ep = endPeriods("2025-01-17", 26).map((d) => d.getTime());
  const dateToday = new Date();
  const dt = dateToday.getTime();
  const twoWeeks = timesheet[12].slice(6, timesheet[12].length - 2);

  let endPeriod = null;
  let grandTotal = 0;

  const twoWeeksOfDates = twoWeeks.map((date) => {
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

    if (row.includes("GRAND TOTAL")) {
      grandTotal = row[row.length - 2];
    }

    if (row.includes("End Period:")) {
      for (let x = 0; x < row.length; x++) {
        if (row[x] instanceof Date) {
          for (let x = 0; x < ep.length; x++) {
            if (dt > ep[x] && dt <= ep[x + 1]) {
              endPeriod = new Date(ep[x + 1]);
            }
          }

          if (row[x].toUTCString() !== endPeriod.toUTCString()) {
            const epString = getDate(endPeriod);
            const tsEpString = getDate(row[x]);

            errors.push(`End Period should be ${epString}, NOT ${tsEpString} `);
          }
        }
      }

      let temp = endPeriod;
      const periods = twoWeeksOfDates.reverse();

      for (let i = 0; i < periods.length; i++) {
        const tempDate = `${temp.getUTCMonth() + 1}/${temp.getUTCDate()}`;

        if (periods[i] === undefined) {
          continue;
        } else if (periods[i] !== tempDate) {
          errors.push(`Date of ${periods[i]} should be ${tempDate}`);
        }

        temp.setDate(temp.getDate() - 1);
      }
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

  calculateTotalHours({
    weekOneTotal,
    weekTwoTotal,
    totalHours,
    grandTotal,
  }).forEach((err) => errors.push(err));

  return errors;
};

export { traverseExcel };
