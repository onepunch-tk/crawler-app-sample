import React from "react";

type CardTitleProps = {
  title: string;
};
export function CardTitle({ title }: CardTitleProps) {
  return (
    <h2 className="text-secondary dark:text-secondary-dark text-lg mb-7 font-bold cursor-default">
      {title}
    </h2>
  );
}
