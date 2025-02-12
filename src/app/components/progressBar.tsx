import React from "react";

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-4 w-full rounded-[30px] bg-neutral-100 dark:bg-neutral-800">
      <div
        className="h-4 rounded-[30px] bg-purple-400"
        style={{ width: progress + "%" }}
      ></div>
    </div>
  );
}
