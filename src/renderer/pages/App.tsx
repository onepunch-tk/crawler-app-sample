import { ChangeEvent, Fragment } from "react";
import { SunSvg } from "@components/SunSvg";
import { MoonSvg } from "@components/MoonSvg";
import { useRecoilState } from "recoil";
import { themeState } from "@recoil/theme/atoms";

export function App() {
  const [theme, setTheme] = useRecoilState(themeState);
  const toggleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    e.currentTarget.value === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <Fragment>
      <div className="flex mt-2 ml-2">
        <SunSvg />
        <label className="relative inline-flex items-center mx-3 cursor-pointer">
          <input
            onChange={toggleHandler}
            type="checkbox"
            value={theme}
            className="sr-only peer"
            checked={theme === "dark"}
          />
          <div className="w-[2.5rem] h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-[calc(2.5rem-1rem-4px)] peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[1rem] after:w-[1rem] after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
        </label>
        <MoonSvg />
      </div>
    </Fragment>
  );
}
