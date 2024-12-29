import { calculateShiftTimes } from "./calculateShiftTimes";
import { traverseRow } from "./traverseRow";

const traverseExcel = (excel) => {
  const timesheet = excel;
  console.log("timesheet---->", timesheet);
  for (let x = 0; x < timesheet.length; x++) {
    const shiftTimes = calculateShiftTimes(timesheet[x]);

    if (shiftTimes) {
      const matchErrors = traverseRow({ row: timesheet[x], hours: shiftTimes });

      matchErrors.length &&
        timesheet.errors.push({ [`row ${x + 1}`]: matchErrors });
    }
  }

  return timesheet;
};

export { traverseExcel };
