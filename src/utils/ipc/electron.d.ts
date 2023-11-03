type Electron = {
  instagramApi: {
    signIn: (auth: SignInType) => Promise<InstagramDefaultResponse>;
  };
};

declare let electron: Electron;
