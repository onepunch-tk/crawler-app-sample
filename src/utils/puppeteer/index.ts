import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import AnonymizeUAPlugin from "puppeteer-extra-plugin-anonymize-ua";
import AdBlockerPlugin from "puppeteer-extra-plugin-adblocker";
import BlockResourcePlugin from "puppeteer-extra-plugin-block-resources";
import path from "path";
import { Browser, Permission, ResourceType } from "puppeteer";

type ChromiumCommandType =
  | "--disable-gpu"
  | "--disable-notifications"
  | "--start-maximized"
  | "--no-sandbox"
  | "--disable-setuid-sandbox"
  | "--disable-web-security"
  | "--disable-popup-blocking";
type HeadlessType = "new" | true | false;
type UserDataDirType = "insta" | "ytb" | "coupang" | "naver";
type BrowserProps = {
  headless: HeadlessType;
  args: ChromiumCommandType[];
  dirName: UserDataDirType;
  blockResources: ResourceType[];
  permission?: {
    origin: string;
    permissions: Permission[];
  };
};
const createBrowser = async ({
  headless,
  args,
  dirName,
  blockResources,
  permission,
}: BrowserProps) => {
  puppeteer.use(StealthPlugin());
  puppeteer.use(AnonymizeUAPlugin());
  puppeteer.use(
    AdBlockerPlugin({
      blockTrackers: true,
    })
  );
  const blockResourcePlugin = BlockResourcePlugin();
  puppeteer.use(blockResourcePlugin);
  blockResources.forEach((blockType) => {
    blockResourcePlugin.blockedTypes.add(blockType);
  });

  const browser = await puppeteer.launch({
    headless,
    args,
    userDataDir: path.join(__dirname, `${dirName}-user-data-dir`),
    protocolTimeout: 240000,
  });

  if (permission) {
    const { origin, permissions } = permission;
    const context = browser.defaultBrowserContext();
    await context.overridePermissions(origin, permissions);
  }

  return browser;
};

const getPage = async (browser: Browser, headless: HeadlessType) => {
  const page = await browser.newPage();
  const userAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36";
  await page.setUserAgent(userAgent);
  if (headless === false) {
    await page.setViewport({ width: 1920, height: 1080 });
  }
  return page;
};

export { createBrowser, getPage };
