type Electron = {
  instagramApi: {
    signIn: (auth: SignInType) => Promise<SignInResponse>;
    getHashtagPageList: (
      hashtagPageInfo: HashtagSearchType
    ) => Promise<HashtagPageListResponse>;
  };
};

declare let electron: Electron;
