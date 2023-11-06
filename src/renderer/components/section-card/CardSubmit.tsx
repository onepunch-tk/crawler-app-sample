import React, { MouseEventHandler } from "react";
import { Spinner } from "@components/Spinner";

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
      disabled={loading}
      type="button"
      className="bg-amber-400 dark:bg-amber-500 w-full py-2 rounded-md text-neutral-700 dark:text-neutral-950 font-semibold shadow-box dark:shadow-box-dark hover:disabled:scale-100 hover:scale-105 transition-transform duration-300"
      onClick={onSubmitHandler}
    >
      {loading ? (
        <div className="flex justify-center items-center space-x-3">
          <span>{subContent}</span>
          <Spinner w="w-4" h="h-4" />
        </div>
      ) : (
        <span>{content}</span>
      )}
    </button>
  );
}
