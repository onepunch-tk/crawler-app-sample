import { Fragment, memo, useEffect, useState } from "react";
import { cls } from "@utils/classnames";
import { SidebarMenuType } from "@renderer/types";
import { Link } from "react-router-dom";

type SidebarProps = {
  menuList: SidebarMenuType[];
};

export const Sidebar = memo(function Sidebar({ menuList }: SidebarProps) {
  const [hidden, setHidden] = useState<boolean>(true);
  useEffect(() => {
    console.log("sidebar");
  }, [menuList]);
  return (
    <Fragment>
      <section
        className={cls(
          "absolute flex-box-col-center shadow-right dark:shadow-right-dark justify-start box-light-bg dark:box-dark-bg left-0 h-full pt-12 overflow-hidden transition-[width] duration-500",
          hidden ? "w-0" : "w-52"
        )}
      >
        <div
          onClick={() => setHidden((prev) => !prev)}
          className="absolute flex-box-col-center rounded-full w-8 h-8 top-2 right-2 font-semibold text-lg shadow-box dark:shadow-box-dark hover:scale-110 transition-transform duration-300 cursor-pointer"
        >
          &larr;
        </div>
        {menuList.map((menu, index) => (
          <div
            key={index}
            className={cls(
              "w-full rounded-lg flex justify-center items-center py-5 cursor-pointer truncate hover:transition-colors hover:bg-amber-400 hover:dark:bg-amber-500 hover:text-neutral-950 hover:duration-300"
            )}
          >
            <Link to={menu.path}>{menu.title}</Link>
          </div>
        ))}
      </section>
      <button
        className={cls(
          "absolute flex-box-col-center shadow-box dark:shadow-box-dark left-10 top-5 w-10 h-10 p-2 text-neutral-950 rounded-full bg-amber-400 dark:bg-amber-500",
          hidden ? "visible transition-[visibility] delay-[400ms]" : "invisible"
        )}
        onClick={() => setHidden((prev) => !prev)}
      >
        <span className="font-semibold text-lg">&larr;</span>
      </button>
    </Fragment>
  );
});
