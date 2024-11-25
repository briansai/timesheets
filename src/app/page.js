"use client";

import React from "react";
import DropZone from "@/components/DropZone";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <main className="flex flex-row justify-evenly gap-8 row-start-2 sm:items-start"> */}
      <DropZone />
      {/* </main> */}
    </div>
  );
}
