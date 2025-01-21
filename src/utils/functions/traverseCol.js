const traverseCol = ({ activeRows, twoWeeksOfDates }) => {
  const bothWeeksLength = activeRows[0] && activeRows[0].bothWeeks.length;
  const errors = [];
  let x = 0;

  while (x < bothWeeksLength) {
    for (let y = 0; y < activeRows.length; y++) {
      const baseHour = activeRows[y].bothWeeks[x];
      const baseStart = `${activeRows[y].start.getUTCHours()}.${activeRows[
        y
      ].start.getUTCMinutes()}`;
      const baseEnd = `${activeRows[y].end.getUTCHours()}.${activeRows[
        y
      ].end.getUTCMinutes()}`;

      for (let z = y + 1; z < activeRows.length; z++) {
        const nextHour = activeRows[z].bothWeeks[x];
        const nextStart = `${activeRows[z].start.getUTCHours()}.${activeRows[
          z
        ].start.getUTCMinutes()}`;
        const nextEnd = `${activeRows[z].end.getUTCHours()}.${activeRows[
          z
        ].end.getUTCMinutes()}`;

        if (baseHour && nextHour) {
          if (
            (nextStart > baseStart && nextStart < baseEnd) ||
            (nextEnd > baseStart && nextEnd < baseEnd)
          ) {
            errors.push(
              `Time Conflict on ${twoWeeksOfDates[x]} - Row ${activeRows[y].idx} & Row ${activeRows[z].idx}`
            );
          }
        }
      }
    }

    x++;
  }

  return errors;
};

export { traverseCol };
