import { contextBridge, ipcRenderer } from "electron";
import { API_ELECTRON, CHANNEL_INSTAGRAM_SIGNIN } from "@/utils/ipc/constants";
import { SignInType } from "@utils/ipc/args";
import { InstagramSignInResponse } from "@utils/ipc/responses";

contextBridge.exposeInMainWorld(API_ELECTRON, {
  instagramApi: {
    signIn: (auth: SignInType): Promise<InstagramSignInResponse> =>
      ipcRenderer.invoke(CHANNEL_INSTAGRAM_SIGNIN, auth),
  },
});
