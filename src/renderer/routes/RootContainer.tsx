import { createHashRouter, Navigate } from "react-router-dom";
import { Root } from "@routes/Root";
import { Home } from "@pages/Home";
import { HOME_ROUTES } from "@routes/constants";
import { Instagram } from "@pages/Instagram";
import { Youtube } from "@pages/Youtube";
import { Coupang } from "@pages/Coupang";
import { Naver } from "@pages/Naver";

console.log("root container");
export const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Navigate to={HOME_ROUTES.HOME} replace /> },
      {
        path: HOME_ROUTES.HOME,
        element: <Home />,
        children: [
          {
            index: true,
            element: <Navigate to={HOME_ROUTES.INSTAGRAM} replace />,
          },
          { path: HOME_ROUTES.INSTAGRAM, element: <Instagram /> },
          { path: HOME_ROUTES.YOUTUBE, element: <Youtube /> },
          { path: HOME_ROUTES.COUPANG, element: <Coupang /> },
          { path: HOME_ROUTES.NAVER, element: <Naver /> },
        ],
      },
    ],
  },
]);
