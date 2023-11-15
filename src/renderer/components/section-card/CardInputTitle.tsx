import React from "react";
import { cls } from "@utils/classnames";

type CardInputTitleProps = { inputTitle: string; fontSize?: string };
export function CardInputTitle({ inputTitle, fontSize }: CardInputTitleProps) {
  return (
    <div
      className={cls(
        "w-16 flex justify-between items-center  font-semibold mr-3",
        fontSize ? fontSize : "text-sm"
      )}
    >
      <label>{inputTitle}</label>
      <label>:</label>
    </div>
  );
}
