import { contextBridge, ipcRenderer } from "electron";
import { API_ELECTRON, CHANNEL_TEST } from "@/utils/ipc/constants";

contextBridge.exposeInMainWorld(API_ELECTRON, {
  testApi: {
    getTest: (value: string): Promise<ITestResponse> =>
      ipcRenderer.invoke(CHANNEL_TEST, value),
  },
});
