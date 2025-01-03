import React, { useEffect, useState } from "react";
import { traverseExcel } from "@/utils/functions/traverseExcel";
import readXlsxFile from "read-excel-file";
import FilesListCorrect from "./FilesListCorrect";
import FilesListError from "./FilesListError";

const ProcessedFiles = ({ timesheets }) => {
  const [correctList, setCorrectList] = useState([]);
  const [errorList, setErrorList] = useState([]);
  const [arraysCompleted, setArraysCompleted] = useState(false);
  const corr = [];
  const errs = [];

  useEffect(() => {
    if (arraysCompleted) {
      setCorrectList(corr);
      setErrorList(errs);
    }

    return;
  }, [arraysCompleted]);

  const p = async () => {
    await timesheets.forEach((file) => {
      file.errors = [];

      if (
        // file.type !== "application/vnd.ms-excel" ||
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        const readTimesheet = async (ts) => {
          const timesheet = await readXlsxFile(ts, {
            dateFormat: "mm/dd/yyyy",
          });

          const excelErrors = traverseExcel(timesheet);

          if (!excelErrors.length) {
            corr.push(file);
          } else {
            for (let x = 0; x < excelErrors.length; x++) {
              if (!file.errors.includes(excelErrors[x])) {
                file.errors = [...excelErrors, ...file.errors];
              }
            }

            errs.push(file);
          }

          setArraysCompleted(true);
        };

        readTimesheet(file);
      } else {
        file.errors.push("File type is not Excel.");
        errs.push(file);
      }
    });
  };

  p();

  return (
    <>
      <div className="row-span-2">
        <FilesListCorrect correctList={correctList} />
      </div>
      <div className="row-span-2">
        <FilesListError errorList={errorList} />
      </div>
    </>
  );
};

export default ProcessedFiles;
