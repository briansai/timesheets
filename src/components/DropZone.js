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

  const files = acceptedFiles.map((file) => {
    console.log(file);
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
            <aside>
              <h4>Files</h4>
              <ul>{files}</ul>
            </aside>
          </div>
        </div>
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
