import React from "react";

type CardInputTitleProps = { inputTitle: string };
export function CardInputTitle({ inputTitle }: CardInputTitleProps) {
  return (
    <div className="w-16 flex justify-between items-center text-sm font-semibold mr-3">
      <label>{inputTitle}</label>
      <label>:</label>
    </div>
  );
}
