import React, { PropsWithChildren } from "react";

export function CardInputWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full justify-items-start items-center h-5 mb-5">
      {children}
    </div>
  );
}
