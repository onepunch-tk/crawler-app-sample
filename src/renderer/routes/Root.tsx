import { Outlet } from "react-router-dom";
import { NavBar } from "@components/NavBar";
import { Fragment } from "react";

export function Root() {
  console.log("root");
  return (
    <Fragment>
      <NavBar />
      <Outlet />
    </Fragment>
  );
}
