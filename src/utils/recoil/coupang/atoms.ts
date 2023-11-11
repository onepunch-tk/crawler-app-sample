import { atom } from "recoil";
import { categoriesEffect } from "@recoil/coupang/categoriesEffect";

export const categoriesState = atom<CP_FirstDepthCategory[]>({
  key: "cp_categories",
  default: [],
  effects_UNSTABLE: [categoriesEffect],
});
