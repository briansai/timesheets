import React from "react";

const FilesListCorrect = ({ correctList }) => {
  return (
    <div>
      <div>Files Correct</div>
      {correctList.map((correct) => (
        <div>{correct.name}</div>
      ))}
    </div>
  );
};

export default FilesListCorrect;
