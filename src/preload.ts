import { contextBridge, ipcRenderer } from "electron";
import {
  API_ELECTRON,
  CHANNEL_INSTAGRAM_HASHTAG_PAGE_LIST,
  CHANNEL_INSTAGRAM_SIGNIN,
} from "@/utils/ipc/constants";

contextBridge.exposeInMainWorld(API_ELECTRON, {
  instagramApi: {
    signIn: (auth: SignInType): Promise<SignInResponse> =>
      ipcRenderer.invoke(CHANNEL_INSTAGRAM_SIGNIN, auth),
    getHashtagPageList: (
      hashtagPageInfo: HashtagSearchType
    ): Promise<HashtagPageListResponse> =>
      ipcRenderer.invoke(CHANNEL_INSTAGRAM_HASHTAG_PAGE_LIST, hashtagPageInfo),
  },
});
