import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "path";
import {
  CHANNEL_INSTAGRAM_HASHTAG_PAGE_LIST,
  CHANNEL_INSTAGRAM_POST_LIST,
  CHANNEL_INSTAGRAM_SIGNIN,
} from "@utils/ipc/constants";
import {
  hashtagPageListHandler,
  instagramSignIn,
  postInfoHandler,
} from "@handlers/instagram";

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegrationInWorker: true,
    },
  });
  const menu = new Menu();
  Menu.setApplicationMenu(menu);

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
      { hash: "/" }
    );
  }
  mainWindow.webContents.openDevTools();
};

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
  app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle(CHANNEL_INSTAGRAM_SIGNIN, instagramSignIn);
ipcMain.handle(CHANNEL_INSTAGRAM_HASHTAG_PAGE_LIST, hashtagPageListHandler);
ipcMain.handle(CHANNEL_INSTAGRAM_POST_LIST, postInfoHandler);
