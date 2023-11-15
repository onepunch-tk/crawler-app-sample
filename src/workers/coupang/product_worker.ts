import { parentPort, workerData } from "node:worker_threads";
import {
  createBrowser,
  getPage,
  waitForSelectorOrNull,
} from "@puppeteer/utils";
import { Browser, Page } from "puppeteer";

const postWorker = async () => {
  const {
    productName,
    searchId,
    pageNumber,
    rocketDelivery,
    sorter,
    listSize,
    adBlock,
  }: CP_SearchInfo = workerData;
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
      //blockResources: [],
    });

    let searchUrl = `https://www.coupang.com/np/search?rocketAll=${rocketDelivery}&q=${productName}&page=${pageNumber}`;
    if (!searchId.includes("all")) {
      searchUrl += `&component=${searchId}`;
    }
    if (!sorter.includes("none")) {
      searchUrl += `&sorter=${sorter}`;
    }
    console.log(searchUrl);
    page = await getPage(browser);
    await page.goto(searchUrl, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await removeAdElement(page, [
      "#searchBestSellerCarouselWidget",
      "#searchSdwAgingCarouselWidget",
      "#srp-bottom-carousel-dco-contaner",
    ]);
    const products = await page.evaluate(() => {
      const result: CP_ProductType[] = [];
      const productElList = Array.from(
        document.querySelectorAll(".search-product")
      ).filter((el) => {
        return el.classList.length === 1;
      });

      productElList &&
        productElList.forEach((liEl) => {
          const productName = liEl.querySelector(".name")?.textContent.trim();
          const price = liEl.querySelector(".price-value")?.textContent.trim();
          const img =
            "https:" +
            liEl
              .querySelector("img.search-product-wrap-img")
              ?.getAttribute("src");
          const dcRate = liEl
            .querySelector(".instant-discount-rate")
            ?.textContent.trim();
          const priceBase = liEl
            .querySelector(".base-price")
            ?.textContent.trim();
          const rocketDelivery = !!liEl.querySelector(".badge.rocket");
          const starRating = liEl
            .querySelector(".star > .rating")
            ?.textContent.trim();
          const ratingTotalCount = liEl
            .querySelector(".rating-total-count")
            ?.textContent.trim()
            .replace(/[()]/g, "");
          const productUrl =
            "https://www.coupang.com" +
            liEl.querySelector("a")?.getAttribute("href");
          result.push({
            productName,
            price,
            dcRate,
            priceBase,
            rocketDelivery,
            starRating,
            ratingTotalCount,
            img,
            productUrl,
          });
        });
      return result;
    });
    parentPort.postMessage({ pageNumber, products });
  } catch (e) {
    console.error(e);
    parentPort.postMessage({ pageNumber, products: [] });
  } finally {
    browser && (await browser.close());
  }
};
const removeAdElement = async (page: Page, selectors: string[]) => {
  selectors.map(async (selector) => {
    const removeHandler = await waitForSelectorOrNull(page, selector);
    removeHandler && (await removeHandler.evaluate((el) => el.remove()));
  });
};

postWorker();
