"use client";

import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import FilesListCorrect from "./FilesListCorrect";
import FilesListError from "./FilesListError";

function DropZone(props) {
  const { required, name } = props;
  const { correct, setCorrect } = useState([]);
  const [errors, setErrors] = useState([]);

  const hiddenInputRef = useRef(null);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    onDrop: (incomingFiles) => {
      if (hiddenInputRef.current) {
        const dataTransfer = new DataTransfer();
        incomingFiles.forEach((file) => {
          dataTransfer.items.add(file);
        });
        hiddenInputRef.current.files = dataTransfer.files;
      }
    },
  });

  const files = acceptedFiles.map((file) => {
    if (
      file.type === "application/vnd.ms-excel" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      // Do something with the Excel file
      console.log("Valid Excel file:", file);
    } else {
      // Handle invalid file type
      console.log("Invalid file type:", file.type);
    }

    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });

  return (
    <div className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        {/*
          Add a hidden file input 
          Best to use opacity 0, so that the required validation message will appear on form submission
        */}
        <div className="grid grid-rows-3 grid-flow-col gap-4">
          <div className="row-span-3 ...">
            <input
              type="file"
              name={name}
              required={required}
              style={{ opacity: 0 }}
              ref={hiddenInputRef}
            />
            <input {...getInputProps()} />
            <p>Drag 'n' drop some Excel Timesheets here</p>
            <button
              type="button"
              onClick={open}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Open File Dialog
            </button>
          </div>

          <div className="row-span-3">
            <FilesListCorrect correct={correct} setCorrect={setCorrect} />
            <FilesListError errors={errors} setErrors={setErrors} />
          </div>
        </div>
      </div>
    </div>
  );
}

<form
  onSubmit={(e) => {
    e.preventDefault();
    console.log("potato");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("my-file");

    alert(file.name);
  }}
>
  <DropZone name="my-file" required />
  <button type="submit">Submit</button>
</form>;

export default DropZone;
