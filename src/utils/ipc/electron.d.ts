type Electron = {
  instagramApi: {
    signIn: (auth: SignInType) => Promise<SignInResponse>;
    getHashtagPageList: (
      hashtagPageInfo: HashtagSearchType
    ) => Promise<HashtagPageListResponse>;
    getPostInfoList: (urls: string[]) => Promise<void>;
    onTestMessage: (
      callback: (e: Electron.IpcRendererEvent, value: string) => void
    ) => void;
  };
  coupangApi: {
    categories: () => Promise<CoupangCategoriesResponse>;
  };
};

declare let electron: Electron;
