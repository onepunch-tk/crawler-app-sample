import { SvgContainerSizeType } from "@renderer/types";
import { cls } from "@utils/classnames";

type SunSvgProps = SvgContainerSizeType;
export function SunSvg({ w = "w-6", h = "h-6" }: SunSvgProps) {
  return (
    <div className={cls("relative", w, h)}>
      <svg
        className="absolute h-[100%] w-[100%] top-0 left-0"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-blue-400 dark:fill-slate-400 transition-colors duration-300"
          d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
        />
        <path
          className="fill-blue-500 dark:fill-slate-500 transition-colors duration-300"
          d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
        />
      </svg>
    </div>
  );
}
