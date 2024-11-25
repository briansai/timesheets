import React from "react";

const FilesListError = ({ errorsList }) => {
  //   console.log("error-->", errorsList);
  return (
    <div>
      <div>Files Error</div>
      <div>{errorsList}</div>
    </div>
  );
};

export default FilesListError;
