import { SvgContainerSizeType } from "@renderer/types";
import { cls } from "@utils/classnames";

type NaverSvgProps = SvgContainerSizeType & {
  classname: string;
};
export function NaverSvg({ w = "w-6", h = "h-6", classname }: NaverSvgProps) {
  return (
    <div className={cls("relative", w, h)}>
      <svg
        className="absolute h-[100%] w-[100%] top-0 left-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path
          className={classname}
          d="M21.1 33.9c12.7-4.6 26.9-.7 35.5 9.6L320 359.6V64c0-17.7 14.3-32 32-32s32 14.3 32 32V448c0 13.5-8.4 25.5-21.1 30.1s-26.9 .7-35.5-9.6L64 152.4V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 50.5 8.4 38.5 21.1 33.9z"
        />
      </svg>
    </div>
  );
}
