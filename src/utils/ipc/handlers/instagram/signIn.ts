import {
  createBrowser,
  getPage,
  waitFor,
  waitForSelectorOrNull,
} from "@utils/puppeteer/utils";

const signInFormSelector = "form#loginForm";
const idInputSelector = "input[name=username]";
const passwordInputSelector = "input[name=password]";
const signInBtnSelector = "button[type=submit]";

export const instagramSignIn = async (
  e: Electron.IpcMainInvokeEvent,
  auth: SignInType
): Promise<SignInResponse> => {
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

    /*main page에서 로그인 form이 존재 여부 확인*/
    const signInFormHandler = await waitForSelectorOrNull(
      page,
      signInFormSelector
    );
    if (!signInFormHandler) {
      throw new Error("페이지를 확인할 수 없습니다.");
    }

    /*아이디와 패스워드를 사람처럼 보이기위함 50ms 간격으로 타이핑한다.*/
    for (const char of auth.id.split("")) {
      await page.type(`${signInFormSelector} ${idInputSelector}`, char);
      await waitFor(50);
    }
    for (const char of auth.password.split("")) {
      await page.type(`${signInFormSelector} ${passwordInputSelector}`, char);
      await waitFor(50);
    }
    await page.click(signInBtnSelector);

    //https://www.instagram.com/api/v1/web/accounts/login/ajax/
    /*403 - login failed 200 - login success*/
    const response = (await (
      await page.waitForResponse(
        (res) => {
          console.log(res.url(), res.status());
          return res
            .url()
            .includes(
              "https://www.instagram.com/api/v1/web/accounts/login/ajax"
            );
        },
        { timeout: 5000 }
      )
    ).json()) as SignInResponse;
    await page.close();
    await browser.close();
    return response;
  } catch (e) {
    console.error(e);
    return { authenticated: false };
  }
};
