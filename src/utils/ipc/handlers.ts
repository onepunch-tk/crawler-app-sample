import puppeteer from "puppeteer-extra";

export const getTestHandler = async (
  e: Electron.IpcMainInvokeEvent,
  message: string
): Promise<ITestResponse> => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--window-size=1920,1080"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("https://www.naver.com");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await page.close();
    await browser.close();
  } catch (e) {
    console.error(e);
  }
  return { message: "pong" };
};
