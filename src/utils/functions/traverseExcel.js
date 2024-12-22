import { calculateShiftTimes } from "./calculateShiftTimes";
import { traverseRow } from "./traverseRow";

const traverseExcel = (excel) => {
  const arrayOfErrors = [];

  for (let x = 0; x < excel.length; x++) {
    const shiftTimes = calculateShiftTimes(excel[x]);

    if (shiftTimes) {
      const matchErrors = traverseRow({ row: excel[x], hours: shiftTimes });

      matchErrors.length &&
        arrayOfErrors.push({ [`row ${x + 1}`]: matchErrors });
    }
  }

  if (arrayOfErrors.length) {
    console.log(arrayOfErrors);
  } else {
    console.log("All correct!");
  }
};

export { traverseExcel };
