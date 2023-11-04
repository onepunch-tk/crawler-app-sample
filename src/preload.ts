import { contextBridge, ipcRenderer } from "electron";
import {
  API_ELECTRON,
  CHANNEL_INSTAGRAM_HASHTAG,
  CHANNEL_INSTAGRAM_SIGNIN,
} from "@/utils/ipc/constants";

contextBridge.exposeInMainWorld(API_ELECTRON, {
  instagramApi: {
    signIn: (auth: SignInType): Promise<InstagramSignInResponse> =>
      ipcRenderer.invoke(CHANNEL_INSTAGRAM_SIGNIN, auth),
    hashtagCrawl: (crawl: HashtagCrawlType): Promise<any> =>
      ipcRenderer.invoke(CHANNEL_INSTAGRAM_HASHTAG, crawl),
  },
});
