import React, { MouseEventHandler } from "react";

type CardSubmitProps = {
  loading: boolean;
  onSubmitHandler: MouseEventHandler;
  content: string;
  subContent: string;
};
export function CardSubmit({
  loading,
  onSubmitHandler,
  content,
  subContent,
}: CardSubmitProps) {
  return (
    <button
      type="button"
      className="bg-amber-400 dark:bg-amber-500 w-full py-2 rounded-md text-neutral-700 dark:text-neutral-950 font-semibold shadow-box dark:shadow-box-dark hover:scale-105 transition-transform duration-300"
      onClick={onSubmitHandler}
    >
      {loading ? subContent : content}
    </button>
  );
}
