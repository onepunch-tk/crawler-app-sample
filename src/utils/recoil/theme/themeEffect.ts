import { AtomEffect } from "recoil";
import { ETheme, setClassTheme, ThemeType } from "@recoil/theme/common";

export const themeEffect: AtomEffect<ThemeType> = ({ setSelf, onSet }) => {
  /*init Data*/
  const savedData = localStorage.getItem(ETheme.KEY);
  if (savedData) {
    const setTheme = savedData === ETheme.DARK ? ETheme.DARK : ETheme.LIGHT;
    setSelf(setTheme);
    setClassTheme(setTheme);
  } else {
    setSelf(ETheme.DARK);
    document.documentElement.classList.add(ETheme.DARK);
    localStorage.setItem(ETheme.KEY, ETheme.DARK);
  }

  /*state change event*/
  onSet((newTheme, _, isReset) => {
    isReset
      ? localStorage.removeItem(ETheme.KEY)
      : localStorage.setItem(ETheme.KEY, newTheme);

    setClassTheme(newTheme);
  });
};
