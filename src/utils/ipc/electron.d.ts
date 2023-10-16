type Electron = {
  testApi: {
    getTest: (value: string) => Promise<ITestResponse>;
  };
};

declare let electron: Electron;
