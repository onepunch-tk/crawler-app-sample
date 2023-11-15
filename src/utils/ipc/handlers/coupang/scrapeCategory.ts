import { Browser, ElementHandle, Page } from "puppeteer";
import {
  createBrowser,
  getPage,
  waitForSelectorOrNull,
} from "@puppeteer/utils";
import { throwFailure } from "@handlers/common";

export const scrapeCategory = async (): Promise<CoupangCategoriesResponse> => {
  let browser: Browser;
  let page: Page;
  try {
    browser = await createBrowser({
      commands: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
      ],
      blockResources: ["image", "media", "font", "stylesheet"],
    });
    page = await getPage(browser);
    await page.goto("https://www.coupang.com");
    // await page.waitForNetworkIdle({ idleTime: 100 });
    // console.log("waitfor done");
    const shopMenuElList = await page.$$(".shopping-menu-list > li");

    if (!shopMenuElList.length) {
      return await throwFailure(browser, page, "not found elements");
    }
    const results: CP_FirstDepthCategory[] = [
      { id: "all", content: "전체" },
      ...(await getCategories<CP_FirstDepthCategory>(
        shopMenuElList,
        DEPTH.FIRST
      )),
    ];

    await page.close();
    await browser.close();
    return { ok: true, results };
  } catch (e) {
    console.log(e);
    return await throwFailure(browser, page, e.message);
  }
};

enum DEPTH {
  FIRST,
  SECOND,
  THIRD,
}
const getCategories = async <
  T extends CP_FirstDepthCategory | CP_SecondDepthCategory | CP_DefaultCategory
>(
  handlers: ElementHandle[],
  depth: DEPTH
): Promise<T[]> => {
  const results: T[] = [];
  await Promise.all(
    handlers.map(async (handler, index) => {
      const anchorEl = (await waitForSelectorOrNull(
        handler,
        "a"
      )) as ElementHandle<HTMLAnchorElement>;

      const result = await getCoupangCategoryObj<T>(anchorEl, index);
      if (result) {
        if (DEPTH.FIRST === depth) {
          const secondDepthList = await handler.$$(
            "li.second-depth-list:not(.more-category)"
          );
          const secondResult = await getCategories<CP_SecondDepthCategory>(
            secondDepthList,
            DEPTH.SECOND
          );
          secondResult.length
            ? ((result as CP_FirstDepthCategory).secondDepth =
                result.content.includes("패션의류")
                  ? secondResult
                  : [{ id: "none", content: "none" }, ...secondResult])
            : undefined;
        } else if (DEPTH.SECOND === depth) {
          const thirdDepthList = await handler.$$(".third-depth-list li");
          const thirdResult = await getCategories<CP_DefaultCategory>(
            thirdDepthList,
            DEPTH.THIRD
          );
          thirdResult.length
            ? ((result as CP_SecondDepthCategory).thirdDepth = [
                { id: "none", content: "none" },
                ...thirdResult,
              ])
            : undefined;
        }
        await handler.evaluate((el) => el.remove());
        results.push(result);
      }
    })
  );
  return results;
};
const getCoupangCategoryObj = async <
  T extends CP_FirstDepthCategory | CP_SecondDepthCategory | CP_DefaultCategory
>(
  handle: ElementHandle<HTMLAnchorElement>,
  index: number
): Promise<T> => {
  try {
    const content = await handle.evaluate((el) => el.textContent.trim());
    const href = await handle.evaluate((el) => el.href.trim());
    if (href.includes("campaigns")) {
      return;
    }
    const id = !href.includes("javascript:")
      ? (Number(href.split("/").slice(-1)[0]) - 100).toString()
      : `none-${index}`;
    return Promise.resolve({ id, content } as T);
  } catch (e) {
    return;
  }
};
