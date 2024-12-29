import React from "react";

const FilesListCorrect = ({ correctList }) => {
  return (
    <>
      <div className="font-bold text-lg">Files Correct</div>
      {correctList.map((correct, idx) => (
        <div key={`${correct}-${idx}`}>* {correct.name}</div>
      ))}
    </>
  );
};

export default FilesListCorrect;
