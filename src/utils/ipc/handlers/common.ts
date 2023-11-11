import { Browser, Page } from "puppeteer";

type FailureDefault = {
  ok: boolean;
  error?: string;
};
export const throwFailure = async (
  browser: Browser,
  page: Page,
  error: string
): Promise<FailureDefault> => {
  page && (await page.close());
  browser && (await browser.close());
  return { ok: false, error };
};
