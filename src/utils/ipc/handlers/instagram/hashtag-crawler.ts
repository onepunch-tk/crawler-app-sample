import {
  createBrowser,
  getPage,
  waitForResponseOrNull,
} from "@utils/puppeteer";
import { ERROR, STATUS } from "@utils/ipc/responses/instagram/response-type";

export const hashtagCrawler = async (
  e: Electron.IpcMainInvokeEvent,
  auth: SignInType
): Promise<InstagramCrawlResponse> => {
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
    const response: InstagramCrawlResponse = {
      status: STATUS.SUCCESS,
    };
    if (landingResponse) {
      response.status = STATUS.FAILURE;
      response.error = ERROR.UNAUTHENTICATED;
    } else {
      response.results = [];
    }

    await page.close();
    await browser.close();
    return response;
  } catch (e) {
    console.error(e);
    return { status: STATUS.FAILURE, error: ERROR.BAD_REQUEST };
  }
};
