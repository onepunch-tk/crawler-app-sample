import { AtomEffect } from "recoil";
import { ThemeType } from "@recoil/theme/types";

export const themeEffect: AtomEffect<ThemeType> = ({ setSelf, onSet }) => {
  const savedData = localStorage.getItem("theme");
  if (savedData) {
    setSelf(savedData as ThemeType);
    savedData === "dark"
      ? document.documentElement.classList.add(savedData)
      : document.documentElement.classList.remove("dark");
  } else {
    setSelf("dark");
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
  }

  onSet((newValue, _, isReset) => {
    isReset
      ? localStorage.removeItem("theme")
      : localStorage.setItem("theme", newValue);

    newValue === "dark"
      ? document.documentElement.classList.add(newValue)
      : document.documentElement.classList.remove("dark");
  });
};
