export enum ETheme {
  KEY = "theme",
  DARK = "dark",
  LIGHT = "light",
}
export type ThemeType = ETheme;

export const setClassTheme = (theme: ThemeType) => {
  theme === ETheme.DARK
    ? document.documentElement.classList.add(ETheme.DARK)
    : document.documentElement.classList.remove(ETheme.DARK);
};
