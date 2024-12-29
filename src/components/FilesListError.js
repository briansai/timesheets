import React from "react";
import ErrorsType from "./ErrorsType";

const FilesListError = ({ errorList }) => {
  return (
    <ul>
      <div className="font-bold text-lg">Files Error</div>
      {errorList.map((error, idx) => (
        <li key={`${error.name}-${idx}`}>
          <div>* {error.name}</div>
          <ErrorsType errorsType={error.errors} />
        </li>
      ))}
    </ul>
  );
};

export default FilesListError;
