import { ThemeToggle } from "@components/Navbar/ThemeToggle";
import { HOME_ROUTES } from "@routes/constants";
import { Item } from "@components/Navbar/Item";

export function Navbar() {
  return (
    <nav className="fixed top-0 bg-neutral-50 dark:bg-neutral-900 w-full h-12 shadow-box dark:shadow-box-dark flex justify-between items-center px-5 transition-[background-color,box-shadow]  duration-500">
      <div className="h-full flex justify-center items-center space-x-6">
        <Item route={HOME_ROUTES.INSTAGRAM} title="인스타" />
        <Item route={HOME_ROUTES.YOUTUBE} title="유튜브" />
        <Item route={HOME_ROUTES.COUPANG} title="대륙간탄도미사일" />
        <Item route={HOME_ROUTES.NAVER} title="블로그" />
      </div>
      <div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
