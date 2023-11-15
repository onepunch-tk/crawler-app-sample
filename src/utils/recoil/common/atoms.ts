import { atom } from "recoil";

export enum WORK_KEY {
  NONE,
  CP_CATEGORY,
  CP_PRODUCT,
  DONE,
}
export type WorkState = {
  isWork: boolean;
  workKey: WORK_KEY;
};
export const workState = atom<WorkState>({
  key: "workState",
  default: { isWork: false, workKey: WORK_KEY.NONE },
});
