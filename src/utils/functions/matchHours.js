import React from "react";

const matchHours = ({ week, hours }) => {
  let err = "";
  let weekHours = [];

  for (let x = 0; x < week.length; x++) {
    let hr = week[x];

    weekHours.push(hr);

    if (hr !== null) {
      hr = hr.toFixed(2);

      if (hr !== hours) {
        err = `${hr} does not equal to the shift hours of ${hours}`;
      }
    }
  }

  return { err, weekHours };
};

export { matchHours };
