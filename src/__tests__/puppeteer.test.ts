import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import AnonymizeUAPlugin from "puppeteer-extra-plugin-anonymize-ua";
import AdBlockerPlugin from "puppeteer-extra-plugin-adblocker";
import BlockResourcePlugin from "puppeteer-extra-plugin-block-resources";
import { Browser, Page } from "puppeteer";

let browser: Browser;
let page: Page;
const args = [
  "--disable-gpu",
  "--disable-notifications",
  "--start-maximized",
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-web-security",
  "--disable-popup-blocking",
];
enum SORTER {
  SALE_COUNT_DESC = "saleCountDesc",
  LATEST_ASC = "latestAsc",
  SALE_PRICE_DESC = "salePriceDesc",
  SALE_PRICE_ASC = "salePriceAsc",
}
beforeAll(async () => {
  const blockResourcePlugin = BlockResourcePlugin();
  puppeteer.use(blockResourcePlugin);
  //blockResourcePlugin.blockedTypes.add("image");
  puppeteer.use(StealthPlugin());
  puppeteer.use(AnonymizeUAPlugin());
  puppeteer.use(
    AdBlockerPlugin({
      blockTrackers: true,
    })
  );
  browser = await puppeteer.launch({
    headless: "new",
    args,
    protocolTimeout: 240000,
  });
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

describe("Coupang 검색 테스트", () => {
  it("should finish search", async () => {
    const keyword = "카라티";
    const mansClothId = "498817";
    const searchUrl = `https://www.coupang.com/np/search?rocketAll=false&q=${keyword}&page=1&component=${mansClothId}&sorter=${SORTER.SALE_COUNT_DESC}`;

    await page.goto(searchUrl);
    await page.waitForNetworkIdle({ idleTime: 100, timeout: 10000 });
    const searchResults = await page.evaluate(() => {
      const products: CP_ProductType[] = [];
      document.querySelectorAll(".search-product").forEach((liEl) => {
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
        const priceBase = liEl.querySelector(".base-price")?.textContent.trim();
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
        products.push({
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

      return products;
    });
    console.log(searchResults);
    expect(searchResults.length).toBeGreaterThan(0);
    /*
    * productName: string;
  img: string;
  price: string;
  dcRate?: string;
  priceBase?: string;
  rocketDelivery: boolean;
  starRating: string;
  ratingTotalCount: string;
  productUrl: string;
    * */
    expect(searchResults[0].productName).toBe(
      "Vella Homme 남성 면100% 골프 긴팔티 폴로티 카라 티셔츠 스포츠웨어"
    );
    expect(searchResults[0].img).toContain("https://thumbnail");
    expect(searchResults[0].price).toBe("29,800");
    expect(searchResults[0].dcRate).toBe("43%");
    expect(searchResults[0].priceBase).toBe("53,000");
    expect(searchResults[0].starRating).toBe("4.0");
    expect(searchResults[0].ratingTotalCount).toBe("282");
    expect(searchResults[0].rocketDelivery).toBe(true);
    expect(searchResults[0].productUrl).toContain("https://www.coupang.com/vp");
  }, 200000);
});
