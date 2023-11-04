import { atom } from "recoil";

const InstagramAuthKey = "instaAuth";
export const instagramAuthState = atom<string>({
  key: "instagramAuthState",
  default: localStorage.getItem(InstagramAuthKey),
  effects: [
    ({ onSet }) => {
      onSet((newUserId) => {
        localStorage.removeItem(InstagramAuthKey);
        if (!newUserId) return;
        localStorage.setItem(InstagramAuthKey, newUserId);
      });
    },
  ],
});
