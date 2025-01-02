import React from "react";

const ErrorsType = ({ errorsType }) => {
  return (
    <ul>
      {errorsType.map((err, idx) => {
        return (
          <li className="pl-6 text-red-500" key={`${err}-${idx}`}>
            <span className="pr-4">-</span>
            <span>{err}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default ErrorsType;
