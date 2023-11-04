type Electron = {
  instagramApi: {
    signIn: (auth: SignInType) => Promise<InstagramSignInResponse>;
    hashtagCrawl: (crawl: HashtagCrawlType) => Promise<any>;
  };
};

declare let electron: Electron;
