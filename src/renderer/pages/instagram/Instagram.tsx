import React from "react";
import { Outlet } from "react-router-dom";

export function Instagram() {
  return (
    <main className="flex-box-col-center h-full">
      <Outlet />
    </main>
  );
}
