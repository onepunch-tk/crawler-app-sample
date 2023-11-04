import { atom } from "recoil";

export const InstagramAuthKey = "instaAuth";
export const instagramAuthState = atom<string>({
  key: "instagramAuthState",
  default: localStorage.getItem(InstagramAuthKey),
  effects: [
    ({ setSelf, onSet }) => {
      onSet((newUserId) => {
        localStorage.removeItem(InstagramAuthKey);
        if (!newUserId) return;
        localStorage.setItem(InstagramAuthKey, newUserId);
      });
    },
  ],
});
