import { atom } from "recoil";
import { themeEffect } from "@recoil/theme/themeEffect";
import { ThemeType } from "@recoil/theme/common";

export const themeState = atom<ThemeType>({
  key: "themeState",
  effects: [themeEffect],
});
