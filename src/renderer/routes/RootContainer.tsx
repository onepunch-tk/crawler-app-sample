import { createHashRouter, Navigate } from "react-router-dom";
import { Root } from "@routes/Root";
import { App } from "@pages/App";

console.log("root container");
export const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "home", element: <App /> },
    ],
  },
]);
