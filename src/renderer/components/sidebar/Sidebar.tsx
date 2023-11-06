import { Fragment, useState } from "react";
import { cls } from "@utils/classnames";

export function Sidebar() {
  const [hidden, setHidden] = useState<boolean>(true);
  return (
    <Fragment>
      <section
        className={cls(
          "absolute flex-box-col-center shadow-right dark:shadow-right-dark justify-start box-light-bg dark:box-dark-bg left-0 h-full space-y-8 overflow-hidden transition-[width] duration-500",
          hidden ? "w-0" : "w-52"
        )}
      >
        <div
          onClick={() => setHidden((prev) => !prev)}
          className="absolute flex-box-col-center rounded-full w-8 h-8 top-2 right-2 font-semibold text-lg shadow-box dark:shadow-box-dark hover:scale-110 transition-transform duration-300 cursor-pointer"
        >
          &larr;
        </div>
        <span>kkk</span>
        <span>kkk</span>
        <span>kkk</span>
        <span>kkk</span>
        <span>kkk</span>
        <span>kkk</span>
      </section>
      <button
        className={cls(
          "absolute flex-box-col-center shadow-box dark:shadow-box-dark left-10 top-5 w-10 h-10 p-2 text-neutral-950 rounded-full bg-amber-400 dark:bg-amber-500",
          hidden ? "visible transition-[visibility] delay-[400ms]" : "invisible"
        )}
        onClick={() => setHidden((prev) => !prev)}
      >
        <span className="font-semibold text-lg">&larr;</span>
      </button>
    </Fragment>
  );
}
