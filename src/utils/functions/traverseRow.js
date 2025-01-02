import { matchHours } from "./matchHours";
import { sumWeekCorrect } from "./sumWeekCorrect";

const traverseRow = ({ row, hours }) => {
  let errors = [];

  const weekOne = row.slice(6, 13);
  const weekTwo = row.slice(13, row.length - 3);

  const weekOneHoursMatch = matchHours({ week: weekOne, hours });
  const weekTwoHoursMatch = matchHours({ week: weekTwo, hours });

  //push the hours in to errors array to return
  // console.log(weekOneHoursMatch);
  // something wrong with sumWeekCorrect
  // issue with totalWeekHour

  const sumWeekOne = sumWeekCorrect({
    week: weekOne,
    totalWeekHour: row[row.length - 2],
  });

  const sumWeekTwo = sumWeekCorrect({
    week: weekTwo,
    totalWeekHour: row[row.length - 1],
  });

  if (weekOneHoursMatch.hours && weekOne.length !== 7) {
    errors.push(`Week 1 error. ${weekOneHoursMatch.hoursNotCorrect}`);
  }

  if (weekTwoHoursMatch.hours && weekOne.length !== 7) {
    errors.push(`Week 2 error. ${weekTwoHoursMatch.hoursNotCorrect}`);
  }

  sumWeekOne && errors.push(`Week 1 error.  ${sumWeekOne}`);
  sumWeekTwo && errors.push(`Week 2 error.  ${sumWeekTwo}`);
  // console.log(errors);
  return errors;
};

export { traverseRow };
