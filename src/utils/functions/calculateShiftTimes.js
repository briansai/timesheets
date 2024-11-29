import { nums } from "../constants/time";

const calculateShiftTimes = (row) => {
  const startTime = new Date(row[4]);
  const endTime = new Date(row[5]);
  if (startTime instanceof Date && endTime instanceof Date) {
    const start = `${startTime.getUTCHours()}.${
      nums[startTime.getUTCMinutes()]
    }`;
    const end = `${endTime.getUTCHours()}.${nums[endTime.getUTCMinutes()]}`;

    if (start > 0 || end > 0) {
      return (end - start).toFixed(2);
    }
  }
};

export { calculateShiftTimes };
