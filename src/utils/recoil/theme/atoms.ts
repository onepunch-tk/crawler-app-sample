import { atom } from "recoil";
import { ThemeType } from "@recoil/theme/types";
import { themeEffect } from "@recoil/theme/themeEffect";

export const themeState = atom<ThemeType>({
  key: "themeState",
  effects: [themeEffect],
});
