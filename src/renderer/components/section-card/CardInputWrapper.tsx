import React, { PropsWithChildren } from "react";
import { cls } from "@utils/classnames";

type CardInputWrapperProps = {
  mb?: string;
};
export function CardInputWrapper({
  children,
  mb,
}: CardInputWrapperProps & PropsWithChildren) {
  return (
    <div
      className={cls(
        "flex w-full justify-items-start items-center h-5",
        mb && mb
      )}
    >
      {children}
    </div>
  );
}
