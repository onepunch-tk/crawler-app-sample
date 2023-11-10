import {
  createBrowser,
  getPage,
  waitForResponseOrNull,
  waitForSelectorOrNull,
  waitTypingValueForInput,
} from "@utils/puppeteer/utils";
import { ERROR, STATUS } from "@utils/ipc/responses/instagram/response-type";
import {
  Browser,
  Page,
} from "puppeteer"; /*----------------------selector------------------------------*/

/*----------------------selector------------------------------*/
const searchIconSelector = "svg:is([aria-label^=검색],[aria-label^=Search])";
const searchInputSelector = "input:is([aria-label^=검색],[aria-label^=Search])"; //분명 바뀐다... 체크해야함
const hashtagPageListSelector = ".x9f619.xocp1fn a";
/*------------------------------------------------------------*/

let page: Page;
let browser: Browser;

const throwFailure = async (
  browser: Browser,
  page: Page,
  error: ERROR
): Promise<HashtagPageListResponse> => {
  page && (await page.close());
  browser && (await browser.close());
  return { status: STATUS.FAILURE, error };
};

export const hashtagPageListHandler = async (
  e: Electron.IpcMainInvokeEvent,
  { hashtag, pageCount }: HashtagSearchType
): Promise<HashtagPageListResponse> => {
  try {
    browser = await createBrowser({
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
    page = await getPage(browser, false);
    await page.goto("https://www.instagram.com/");
    /*log out 상태인지 확인하는 랜딩 response*/
    const landingResponse = await waitForResponseOrNull(
      page,
      "https://www.instagram.com/api/v1/public/landing_info",
      200,
      2000
    );
    if (landingResponse) {
      return throwFailure(browser, page, ERROR.UNAUTHENTICATED);
    }

    /*사이드바 메뉴에서 search icon을 찾고 클릭한다.*/
    const searchIconHandler = await waitForSelectorOrNull(
      page,
      searchIconSelector,
      2000
    );
    if (!searchIconHandler) {
      return await throwFailure(browser, page, ERROR.NOT_FOUND_ELEMENT);
    }
    await searchIconHandler.evaluate((el) => el.parentElement.click());

    /*검색 페이지가 열리면 검색란에 해쉬태그 타이핑*/
    const searchInputHandler = await waitForSelectorOrNull(
      page,
      searchInputSelector,
      2000
    );
    if (!searchInputHandler) {
      return await throwFailure(browser, page, ERROR.NOT_FOUND_ELEMENT);
    }

    /*검색란에 타이핑후, 결과(result list)가 나오길 기다린다.*/
    await waitTypingValueForInput(searchInputHandler, `#${hashtag}`);
    await page.waitForNetworkIdle({ idleTime: 100, timeout: 3000 });
    const hashtagPageElList = await page.$$(hashtagPageListSelector);

    /*검색 결과가 없을 경우*/
    if (hashtagPageElList.length === 0) {
      return await throwFailure(browser, page, ERROR.NOT_FOUND_HASHTAG_RESULT);
    }

    /*a tag 의 href 추출*/
    const urls = await Promise.all(
      hashtagPageElList
        .slice(0, pageCount)
        .map(async (handler) => await handler.evaluate((el) => el.href))
    );

    await page.close();
    await browser.close();
    return { status: STATUS.SUCCESS, urls };
  } catch (e) {
    return await throwFailure(browser, page, ERROR.BAD_REQUEST);
  }
};
