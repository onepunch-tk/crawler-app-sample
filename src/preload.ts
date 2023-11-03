import { contextBridge, ipcRenderer } from "electron";
import { API_ELECTRON, CHANNEL_INSTAGRAM_SIGNIN } from "@/utils/ipc/constants";

contextBridge.exposeInMainWorld(API_ELECTRON, {
  instagramApi: {
    signIn: (auth: SignInType): Promise<InstagramDefaultResponse> =>
      ipcRenderer.invoke(CHANNEL_INSTAGRAM_SIGNIN, auth),
  },
});
