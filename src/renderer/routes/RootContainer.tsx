import { createHashRouter, Navigate } from "react-router-dom";
import { Root } from "@routes/Root";
import { Home } from "@pages/Home";
import { HOME_ROUTES, INSTAGRAM_ROUTES } from "@routes/constants";
import { Youtube } from "@pages/Youtube";
import { Coupang } from "@pages/Coupang";
import { Naver } from "@pages/Naver";
import { Instagram, InstaSearch } from "@pages/instagram";

export const router = createHashRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
        element: <Home />,
        children: [
          {
            index: true,
            element: <Navigate to={HOME_ROUTES.INSTAGRAM} replace />,
          },
          {
            path: HOME_ROUTES.INSTAGRAM,
            element: <Instagram />,
            children: [
              {
                index: true,
                element: <Navigate to={`${INSTAGRAM_ROUTES.SEARCH}`} replace />,
              },
              {
                path: INSTAGRAM_ROUTES.SEARCH,
                element: <InstaSearch />,
              },
            ],
          },
          { path: HOME_ROUTES.YOUTUBE, element: <Youtube /> },
          { path: HOME_ROUTES.COUPANG, element: <Coupang /> },
          { path: HOME_ROUTES.NAVER, element: <Naver /> },
        ],
      },
    ],
  },
]);
