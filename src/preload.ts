import { contextBridge, ipcRenderer } from "electron";
import {
  API_ELECTRON,
  CHANNEL_COUPANG_CATEGORIES,
  CHANNEL_COUPANG_ON_PRODUCTS,
  CHANNEL_COUPANG_PRODUCTS,
  CHANNEL_INSTAGRAM_HASHTAG_PAGE_LIST,
  CHANNEL_INSTAGRAM_POST_LIST,
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
    getPostInfoList: (urls: string[]): Promise<void> =>
      ipcRenderer.invoke(CHANNEL_INSTAGRAM_POST_LIST, urls),
    onTestMessage: (
      callback: (e: Electron.IpcRendererEvent, value: string) => void
    ) => ipcRenderer.once("TEST", callback),
  },
  coupangApi: {
    categories: (): Promise<CoupangCategoriesResponse> =>
      ipcRenderer.invoke(CHANNEL_COUPANG_CATEGORIES),
    getProducts: (searchInfo: CP_SearchInfo): Promise<void> =>
      ipcRenderer.invoke(CHANNEL_COUPANG_PRODUCTS, searchInfo),
    onProducts: (
      callback: (
        e: Electron.IpcRendererEvent,
        productsResponse: CoupangProductsResponse
      ) => void
    ) => ipcRenderer.once(CHANNEL_COUPANG_ON_PRODUCTS, callback),
  },
});
