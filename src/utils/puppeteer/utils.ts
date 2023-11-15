import puppeteer from "puppeteer-extra";
import AnonymizeUAPlugin from "puppeteer-extra-plugin-anonymize-ua";
/*electron에서는 adblocker 플러그인이 로드시 에러를 뱉는다. 해결방법으로는 파일을 수동으로 핸들링해서 사용한다.*/
/*resolve vite.main.config 에서 사전에 로드한다. */
import AdBlockerPlugin from "puppeteer-extra-plugin-adblocker";
import BlockResourcePlugin from "puppeteer-extra-plugin-block-resources";
import {
  Browser,
  ElementHandle,
  Page,
  Permission,
  ResourceType,
} from "puppeteer";
import path from "path";

type ChromiumCommandType =
  | "--disable-gpu"
  | "--disable-notifications"
  | "--start-maximized"
  | "--no-sandbox"
  | "--disable-setuid-sandbox"
  | "--disable-web-security"
  | "--disable-popup-blocking"
  | "--disable-accelerated-2d-canvas";
type UserDataDirType = "insta" | "ytb" | "coupang" | "naver";
type BrowserProps = {
  commands: ChromiumCommandType[];
  dirName?: UserDataDirType;
  blockResources: ResourceType[];
  permission?: {
    origin: string;
    permissions: Permission[];
  };
};
// @ts-ignore
const { VITE_NODE_ENV } = import.meta.env;
const createBrowser = async ({
  commands,
  dirName,
  blockResources,
  permission,
}: BrowserProps) => {
  puppeteer.use(AnonymizeUAPlugin({ stripHeadless: true }));
  puppeteer.use(AdBlockerPlugin({ blockTrackers: true }));
  puppeteer.use(
    BlockResourcePlugin({ blockedTypes: new Set([...blockResources]) })
  );

  const args: string[] = [...commands];
  if (dirName) {
    const userDataDir =
      dirName && VITE_NODE_ENV === "prod"
        ? `--user-data-dir=${path.join(__dirname, `${dirName}-user-data-dir`)}`
        : `--user-data-dir=${path.resolve(
            "./src/__dev__",
            `${dirName}-user-data-dir`
          )}`;
    args.push(userDataDir);
  }

  const headless = VITE_NODE_ENV === "prod" ? "new" : false;
  const browser = await puppeteer.launch({
    headless,
    args,
    ...(VITE_NODE_ENV === "prod" && { channel: "chrome" }),
    protocolTimeout: 240000,
  });

  if (permission) {
    const { origin, permissions } = permission;
    const context = browser.defaultBrowserContext();
    await context.overridePermissions(origin, permissions);
  }

  return browser;
};

const getPage = async (browser: Browser) => {
  const page = await browser.newPage();

  const setUserAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36";
  await page.setUserAgent(setUserAgent);
  // 브라우저의 User-Agent 문자열 가져오기
  const userAgent = await page.evaluate(() => window.navigator.userAgent);
  // User-Agent 문자열에 "Headless" 키워드가 포함되어 있는지 확인
  const isHeadless = userAgent.includes("Headless");
  if (!isHeadless === false) {
    await page.setViewport({ width: 1920, height: 1080 });
  }
  return page;
};

const waitFor = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const waitForSelectorOrNull = async (
  parentHandler: Page | ElementHandle,
  selector: string,
  timeout?: number
) => {
  try {
    return await parentHandler.waitForSelector(selector, {
      ...(timeout ? { timeout } : { timeout: 2000 }),
    });
  } catch (e) {
    return null;
  }
};

const waitForResponseOrNull = async (
  page: Page,
  url: string,
  status?: number,
  timeout?: number
) => {
  try {
    return await page.waitForResponse(
      (res) => {
        console.log(res.url(), res.status());
        return status
          ? res.url().includes(url) && res.status() === status
          : res.url().includes(url);
      },
      { ...(timeout ? { timeout } : { timeout: 5000 }) }
    );
  } catch (e) {
    return null;
  }
};

const waitTypingValueForInput = async (
  inputHandler: ElementHandle,
  value: string,
  ms?: number
) => {
  for (const char of value.split("")) {
    await inputHandler.type(char);
    await waitFor(ms ? ms : 50);
  }
};

export {
  createBrowser,
  getPage,
  waitFor,
  waitForSelectorOrNull,
  waitForResponseOrNull,
  waitTypingValueForInput,
};
