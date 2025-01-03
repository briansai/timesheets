import { matchHours } from "./matchHours";
import { sumWeekCorrect } from "./sumWeekCorrect";

const traverseRow = ({ row, hours }) => {
  let errors = [];

  const weekOne = row.slice(6, 13);
  const weekTwo = row.slice(13, row.length - 3);

  const weekOneHoursMatch = matchHours({ week: weekOne, hours });
  const weekTwoHoursMatch = matchHours({ week: weekTwo, hours });
  // console.log(weekOneHoursMatch);
  const sumWeekOne = sumWeekCorrect({
    week: weekOne,
    totalWeekHour: row[row.length - 2],
  });

  const sumWeekTwo = sumWeekCorrect({
    week: weekTwo,
    totalWeekHour: row[row.length - 1],
  });

  if (weekOneHoursMatch.err) {
    errors.push(`Week 1 error - ${weekOneHoursMatch.err}`);
  }

  if (weekTwoHoursMatch.err) {
    errors.push(`Week 2 error - ${weekTwoHoursMatch.err}`);
  }

  sumWeekOne && errors.push(`Week 1 Total Hours error - ${sumWeekOne}`);
  sumWeekTwo && errors.push(`Week 2 Total Hours error - ${sumWeekTwo}`);

  return errors;
};

export { traverseRow };
