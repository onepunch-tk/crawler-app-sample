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
        <SunSvg />
        <label className="relative inline-flex items-center mx-3 cursor-pointer">
          <input
            onChange={toggleHandler}
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={isDark}
          />
          <div className="w-[2.5rem] h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-[calc(2.5rem-1rem-4px)] peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[1rem] after:w-[1rem] after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
        </label>
        <MoonSvg />
      </div>
    </Fragment>
  );
}
