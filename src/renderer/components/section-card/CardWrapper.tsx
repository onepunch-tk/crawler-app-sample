import { PropsWithChildren } from "react";
import { cls } from "@utils/classnames";

type CardWrapperProps = PropsWithChildren & {
  width?: string;
};

export function CardWrapper({ children, width }: CardWrapperProps) {
  return (
    <section
      className={cls(
        "flex-box-col-center box-light-bg dark:box-dark-bg  min-w-[350px] rounded-md p-10 shadow-box dark:shadow-box-dark transition-[border-color,box-shadow] duration-300",
        width
      )}
    >
      {children}
    </section>
  );
}
