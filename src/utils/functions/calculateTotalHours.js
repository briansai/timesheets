const calculateTotalHours = ({
  weekOneTotal,
  weekTwoTotal,
  totalHours,
  grandTotal,
}) => {
  const errors = [];

  const weekOneSum = weekOneTotal.reduce((acc, cur) => {
    acc += cur;

    return acc;
  }, 0);

  const weekTwoSum = weekTwoTotal.reduce((acc, cur) => {
    acc += cur;

    return acc;
  }, 0);

  const bothWeekSum = weekOneSum + weekTwoSum;

  if (weekOneSum !== totalHours[0]) {
    errors.push("Total hours for week one does not equal to the weekly sum");
  }

  if (weekTwoSum !== totalHours[1]) {
    errors.push("Total hours for week two does not equal to the weekly sum");
  }

  if (bothWeekSum !== grandTotal) {
    errors.push("Grand total does not equal to the sum of both total hours");
  }

  return errors;
};

export { calculateTotalHours };
