import { SunSvg } from "@components/SunSvg";
import { MoonSvg } from "@components/MoonSvg";
import { useRecoilState } from "recoil";
import { themeState } from "@recoil/theme/atoms";
import { ChangeEvent } from "react";
import { ETheme } from "@recoil/theme/common";

export function ThemeToggle() {
  const [theme, setTheme] = useRecoilState(themeState);
  const toggleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value === ETheme.DARK
      ? setTheme(ETheme.LIGHT)
      : setTheme(ETheme.DARK);
  };
  return (
    <div className="flex items-center">
      <SunSvg w="w-4" h="h-4" />
      <label className="relative inline-flex items-center mx-1 cursor-pointer">
        <input
          onChange={toggleHandler}
          type="checkbox"
          value={theme}
          className="sr-only peer"
          checked={theme === "dark"}
        />
        <div className="w-7 h-4 bg-neutral-400 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-neutral-600 after:duration-300" />
      </label>
      <MoonSvg w="w-4" h="h-4" />
    </div>
  );
}
