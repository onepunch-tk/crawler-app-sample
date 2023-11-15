import React, { MouseEventHandler } from "react";

type CardSubmitProps = {
  onSubmitHandler: MouseEventHandler;
  content: string;
  subContent: string;
};
export function CardSubmit({
  onSubmitHandler,
  content,
  subContent,
}: CardSubmitProps) {
  return (
    <button
      type="button"
      className="bg-amber-400 dark:bg-amber-500 w-full py-2 rounded-md text-neutral-700 dark:text-neutral-950 font-semibold shadow-box dark:shadow-box-dark hover:disabled:scale-100 hover:scale-105 transition-transform duration-300"
      onClick={onSubmitHandler}
    >
      <div className="flex justify-center items-center space-x-3">
        <span>{content}</span>
        {/*<Spinner w="w-4" h="h-4" />*/}
      </div>
    </button>
  );
}
