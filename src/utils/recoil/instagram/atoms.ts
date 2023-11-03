import { atom } from "recoil";

type InstagramAuthType = {
  id: string;
  password: string;
};
const InstagramAuthKey = "istaAuth";
export const instagramAuthState = atom<InstagramAuthType>({
  key: "instagramAuthState",
  default: JSON.parse(localStorage.getItem(InstagramAuthKey)),
  effects: [
    ({ onSet }) => {
      onSet((newAuth) => {
        localStorage.removeItem(InstagramAuthKey);
        if (!newAuth.id) return;
        console.log(newAuth);
        localStorage.setItem(InstagramAuthKey, JSON.stringify(newAuth));
      });
    },
  ],
});
