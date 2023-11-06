type Electron = {
  instagramApi: {
    signIn: (auth: SignInType) => Promise<InstagramSignInResponse>;
    hashtagCrawl: (crawl: HashtagCrawlType) => Promise<InstagramCrawlResponse>;
  };
};

declare let electron: Electron;
