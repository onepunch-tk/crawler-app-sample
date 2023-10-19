import { connectionChangeEffect } from "@recoil/online/connectionChangeEffect";
import { atom } from "recoil";

export const onlineState = atom<boolean>({
  key: "onlineState",
  effects: [connectionChangeEffect],
});
