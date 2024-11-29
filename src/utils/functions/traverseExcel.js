import { calculateShiftTimes } from "./calculateShiftTimes";

const traverseExcel = (excel) => {
  for (let x = 0; x < excel.length; x++) {
    const shiftTimes = calculateShiftTimes(excel[x]);
  }
};

export { traverseExcel };
