"use client";

import React, { useState } from "react";
import DropZone from "@/components/DropZone";
import FilesListCorrect from "@/components/FilesListCorrect";
import FilesListError from "@/components/FilesListError";

export default function Home() {
  const { correct, setCorrect } = useState([]);
  const [errors, setErrors] = useState([]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-row justify-evenly gap-8 row-start-2 sm:items-start">
        <div className="grid grid-rows-3 grid-flow-col gap-4">
          <DropZone setCorrect={setCorrect} setErrors={setErrors} />{" "}
        </div>
        <div className="row-span-3">
          <FilesListCorrect correct={correct} />{" "}
        </div>
        <div className="row-span-3">
          <FilesListError errors={errors} />
        </div>
      </main>
    </div>
  );
}
