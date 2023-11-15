import { workerData } from "node:worker_threads";
import { createBrowser, getPage, waitFor } from "@puppeteer/utils";

const postWorker = async () => {
  const { url } = workerData;
  const browser = await createBrowser({
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
  const page = await getPage(browser);
  await page.goto("https://www.instagram.com/");
  console.log(url);
  await waitFor(2000);
  await page.close();
  await browser.close();
};

postWorker();
