import {
  createBrowser,
  getPage,
  waitForResponseOrNull,
} from "@utils/puppeteer";

export const hashtagCrawler = async (
  e: Electron.IpcMainInvokeEvent,
  auth: SignInType
): Promise<any> => {
  try {
    const browser = await createBrowser({
      headless: false,
      commands: [
        "--disable-notifications",
        "--disable-web-security",
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--start-maximized",
      ],
      dirName: "insta",
      blockResources: [],
    });
    const page = await getPage(browser, false);
    await page.goto("https://www.instagram.com/");
    const landingResponse = await waitForResponseOrNull(
      page,
      "https://www.instagram.com/api/v1/public/landing_info",
      200,
      2000
    );
    if (landingResponse) {
      console.log("다시 로그인");
    } else {
      console.log("crawling!!");
    }
    return;
  } catch (e) {
    console.error(e);
  }
};
