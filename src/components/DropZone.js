"use client";

import React, { useRef } from "react";
import { useDropzone } from "react-dropzone";

function DropZone(props) {
  const { required, name } = props;

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

  const goodFiles = acceptedFiles.map((file) => {
    if (
      file.type === "application/vnd.ms-excel" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return <li key={file.path}>{file.name}</li>;
    }
  });

  const badFiles = acceptedFiles.map((file) => {
    console.log(file.type);
    if (
      file.type !== "application/vnd.ms-excel" ||
      file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return <li key={file.path}>{file.name}</li>;
    }
  });

  return (
    <div className="grid grid-cols-3 grid-flow-col gap-4" {...getRootProps()}>
      <div>
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
      <div>
        Good Files
        {goodFiles}
      </div>
      <div>
        Bad Files
        {badFiles}
      </div>
    </div>
  );
}

<form
  onSubmit={(e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("my-file");

    alert(file.name);
  }}
>
  <DropZone name="my-file" required />
  <button type="submit">Submit</button>
</form>;

export default DropZone;
