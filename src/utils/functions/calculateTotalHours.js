const calculateTotalHours = ({ weekOneTotal, weekTwoTotal, totalHours }) => {
  const errors = [];

  const weekOneSum = weekOneTotal.reduce((acc, cur) => {
    acc += cur;

    return acc;
  }, 0);

  const weekTwoSum = weekTwoTotal.reduce((acc, cur) => {
    acc += cur;

    return acc;
  }, 0);

  console.log("week 1", weekOneSum);
  console.log("totalhours-->", totalHours[0]);

  if (weekOneSum !== totalHours[0]) {
    errors.push("Total hours for week one does not equal to the weekly sum");
  }

  if (weekTwoSum !== totalHours[1]) {
    errors.push("Total hours for week two does not equal to the weekly sum");
  }

  return errors;
};

export { calculateTotalHours };
