import { createBrowser, getPage, waitFor } from "@utils/puppeteer";
import { BAD_REQUEST, SUCCESS, UNAUTHORIZED } from "@utils/ipc/constants";

const idInputSelector = "input[name=username]";
const passwordInputSelector = "input[name=password]";
const signInBtnSelector = "form#loginForm button[type=submit]";
export const instagramSignIn = async (
  e: Electron.IpcMainInvokeEvent,
  auth: SignInType
): Promise<InstagramDefaultResponse> => {
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
    const idInputHandler = await page.waitForSelector(idInputSelector, {
      timeout: 2000,
    });
    const passwordInputHandler = await page.waitForSelector(
      passwordInputSelector,
      { timeout: 2000 }
    );
    if (idInputHandler && passwordInputHandler) {
      for (const char of auth.id.split("")) {
        await idInputHandler.type(char);
        await waitFor(50);
      }
      for (const char of auth.password.split("")) {
        await passwordInputHandler.type(char);
        await waitFor(50);
      }

      await page.click(signInBtnSelector);
      await waitFor(2000);
      const incorrectAccountEl = await page.$("._ab2z");
      if (incorrectAccountEl) {
        await page.close();
        await browser.close();
        return {
          status: UNAUTHORIZED,
          error: "아이디와 패스워드를 확인하세요.",
        };
      }
    }
    await page.waitForResponse(
      (res) => res.url().includes("instagram/main") && res.status() === 200
    );
    await page.close();
    await browser.close();
    return { status: SUCCESS };
  } catch (e) {
    return { status: BAD_REQUEST, error: e.message };
  }
};
