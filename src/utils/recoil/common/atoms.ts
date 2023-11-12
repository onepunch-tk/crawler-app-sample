import { atom } from "recoil";

export const workState = atom<boolean>({
  key: "workState",
  default: false,
});
