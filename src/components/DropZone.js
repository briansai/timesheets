"use client";

import React, { useRef } from "react";
import { useDropzone } from "react-dropzone";
import ProcessedFiles from "./ProcessedFiles";

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
    noClick: true,
  });

  return (
    <div className="grid grid-cols-3 grid-flow-col gap-4" {...getRootProps()}>
      <div className="row-span-2">
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
      <ProcessedFiles timesheets={acceptedFiles} />
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
