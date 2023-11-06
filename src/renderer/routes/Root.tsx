import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@components/navbar";
import { Sidebar } from "@components/sidebar/Sidebar";
import { HOME_ROUTES, INSTAGRAM_ROUTES } from "@routes/constants";
import React, { useEffect, useState } from "react";
import { SidebarMenuType } from "@renderer/types";

const instaSubmenuList: SidebarMenuType[] = [
  {
    title: "해쉬태그 검색",
    path: `/${HOME_ROUTES.INSTAGRAM}/${INSTAGRAM_ROUTES.SEARCH}`,
  },
  {
    title: "Test",
    path: `/${HOME_ROUTES.YOUTUBE}`,
  },
];
const getSidebarMenuList = (
  pathName: string,
  dispatch: React.Dispatch<React.SetStateAction<SidebarMenuType[]>>
) => {
  if (pathName.includes(HOME_ROUTES.INSTAGRAM)) {
    dispatch(instaSubmenuList);
    return;
  } else if (pathName.includes(HOME_ROUTES.YOUTUBE)) {
    return;
  } else if (pathName.includes(HOME_ROUTES.COUPANG)) {
    return;
  } else {
    return;
  }
};

export function Root() {
  const location = useLocation();
  const [sidebarMenuList, setSidebarMenuList] = useState<SidebarMenuType[]>([]);
  useEffect(() => {
    getSidebarMenuList(location.pathname, setSidebarMenuList);
  }, [location]);
  return (
    <div className="relative">
      <Navbar />
      <Sidebar menuList={sidebarMenuList} />
      <Outlet />
    </div>
  );
}
