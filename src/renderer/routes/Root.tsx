import { Outlet } from "react-router-dom";
import { Navbar } from "@components/navbar";
import { Fragment } from "react";

export function Root() {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
}
