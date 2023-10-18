import { Fragment } from "react";
import { cls } from "@utils/classnames";
import { Spinner } from "@components/Spinner";
import {
  SpinBorderColorType,
  SpinHeightType,
  SpinWidthType,
} from "@renderer/types";

interface ILoadingProps {
  w?: SpinWidthType;
  h?: SpinHeightType;
  borderColor?: SpinBorderColorType;
  containerBg?: string;
  message?: string;
}

export function Loading({
  w = "w-12",
  h = "h-12",
  borderColor,
  message = "Loading...",
  containerBg = "bg-blue-500",
}: ILoadingProps) {
  return (
    <Fragment>
      <main className="fixed flex-box-col-center w-full h-full box-light-bg dark:box-dark-bg bg-opacity-60">
        <section
          className={cls(
            "loading-container flex-box-col-center w-72 rounded-xl gap-y-6 p-10 bg-red-500 shadow-box dark:shadow-box-dark",
            containerBg
          )}
        >
          <span className="loading-message font-bold">{message}</span>
          <Spinner w={w} h={h} borderColor={borderColor} />
        </section>
      </main>
    </Fragment>
  );
}
