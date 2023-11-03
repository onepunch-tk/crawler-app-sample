import { PropsWithChildren } from "react";

export function CardWrapper({ children }: PropsWithChildren) {
  return (
    <section className="flex-box-col-center box-light-bg dark:box-dark-bg w-1/2 min-w-[350px] rounded-md p-10 shadow-box dark:shadow-box-dark transition-[border-color,box-shadow] duration-300 h-40">
      {children}
    </section>
  );
}
