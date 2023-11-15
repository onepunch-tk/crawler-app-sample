import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "path";
import {
  CHANNEL_COUPANG_CATEGORIES,
  CHANNEL_COUPANG_PRODUCTS,
  CHANNEL_INSTAGRAM_HASHTAG_PAGE_LIST,
  CHANNEL_INSTAGRAM_POST_LIST,
  CHANNEL_INSTAGRAM_SIGNIN,
} from "@utils/ipc/constants";
import {
  hashtagPageListHandler,
  instagramSignIn,
  postInfoHandler,
} from "@handlers/instagram";
import { scapeCoupangProducts, scrapeCategory } from "@handlers/coupang";

if (require("electron-squirrel-startup")) {
  app.quit();
}
export let mainWindow: BrowserWindow | null = null;
const createWindow = () => {
  mainWindow = new BrowserWindow({
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
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
      { hash: "/" }
    );
  }
  mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
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
ipcMain.handle(CHANNEL_COUPANG_CATEGORIES, scrapeCategory);
ipcMain.handle(CHANNEL_COUPANG_PRODUCTS, scapeCoupangProducts);
