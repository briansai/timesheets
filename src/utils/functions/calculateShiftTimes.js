import { nums } from "../constants/time";

const calculateShiftTimes = (row) => {
  const startTime = new Date(row[4]);
  const endTime = new Date(row[5]);
  if (startTime instanceof Date && endTime instanceof Date) {
    const start = `${startTime.getUTCHours()}.${
      nums[startTime.getUTCMinutes()]
    }`;
    const end = `${endTime.getUTCHours()}.${nums[endTime.getUTCMinutes()]}`;
    const totalHours = end - start;

    if (start > 0 || end > 0) {
      return totalHours.toFixed(2);
    }
  }
};

export { calculateShiftTimes };
