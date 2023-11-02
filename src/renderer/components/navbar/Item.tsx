import { InstagramSvg } from "@components/svgs/InstagramSvg";
import { HOME_ROUTES } from "@routes/constants";
import { YoutubeSvg } from "@components/svgs/YoutubeSvg";
import { CoupangSvg } from "@components/svgs/CoupangSvg";
import { NaverSvg } from "@components/svgs/NaverSvg";
import { useLocation, useNavigate } from "react-router-dom";
import { cls } from "@utils/classnames";

type SvgProps = {
  route: HOME_ROUTES;
  isMatch: boolean;
};
function Svg({ route, isMatch }: SvgProps) {
  const classname = cls(
    "transition-all duration-300 group-hover:fill-amber-500 group-hover:transition-colors group-hover:duration-700",
    isMatch
      ? "fill-amber-500 dark:fill-amber-500"
      : "fill-neutral-950 dark:fill-neutral-300"
  );
  switch (route) {
    case HOME_ROUTES.INSTAGRAM:
      return <InstagramSvg classname={classname} />;
    case HOME_ROUTES.YOUTUBE:
      return <YoutubeSvg classname={classname} />;
    case HOME_ROUTES.COUPANG:
      return <CoupangSvg w="w-4" h="h-4" classname={classname} />;
    case HOME_ROUTES.NAVER:
      return <NaverSvg w="w-4" h="h-4" classname={classname} />;
  }
}

type NavbarItemProps = {
  route: HOME_ROUTES;
  title: string;
};
export function Item({ route, title }: NavbarItemProps) {
  const isMatch = useLocation().pathname.includes(`${route}`);
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`${HOME_ROUTES.HOME}/${route}`);
  };
  return (
    <div
      onClick={onClickHandler}
      className={cls(
        "h-full px-2 flex flex-row items-center border-b-2 cursor-pointer group hover:transition-colors hover:duration-700",
        isMatch ? "border-b-amber-600" : "border-b-transparent"
      )}
    >
      <Svg route={route} isMatch={isMatch} />
      <span
        className={cls(
          "ml-1 hidden sm:hidden md:inline md:text-sm group-hover:text-amber-500 group-hover:transition-colors group-hover:duration-700 font-bold",
          isMatch ? "text-amber-500" : ""
        )}
      >
        {title}
      </span>
    </div>
  );
}
