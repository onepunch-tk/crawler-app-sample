import { atom } from "recoil";

type CP_Category = {
  init: boolean;
  categories: CP_FirstDepthCategory[];
};
export const categoriesState = atom<CP_Category>({
  key: "cp_categories",
  default: { init: false, categories: [] },
});
