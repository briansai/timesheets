const endPeriods = (startDate, numWeeks) => {
  let dates = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < numWeeks; i++) {
    dates.push(new Date(currentDate));

    currentDate.setDate(currentDate.getDate() + 14); // Add 14 days (2 weeks)

    while (currentDate.getUTCDay() !== 5) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return dates;
};

export { endPeriods };
