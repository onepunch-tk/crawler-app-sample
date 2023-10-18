import { Fragment, useEffect, useState } from "react";
import { SunSvg } from "@components/SunSvg";
import { MoonSvg } from "@components/MoonSvg";

export function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleHandler = () => setIsDark((prev) => !prev);
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
  return (
    <Fragment>
      <div className="flex mt-2 ml-2">
        <MoonSvg />
        <label className="relative inline-flex items-center mx-2 cursor-pointer">
          <input
            onChange={toggleHandler}
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={isDark}
          />
          <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-300 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
        </label>
        <SunSvg />
      </div>
    </Fragment>
  );
}
