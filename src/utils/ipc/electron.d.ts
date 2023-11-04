type Electron = {
  instagramApi: {
    signIn: (auth: SignInType) => Promise<InstagramSignInResponse>;
  };
};

declare let electron: Electron;
