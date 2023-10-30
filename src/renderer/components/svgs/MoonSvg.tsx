import { SvgContainerSizeType } from "@renderer/types";
import { cls } from "@utils/classnames";

type MoonSvgProps = SvgContainerSizeType;

export function MoonSvg({ w = "w-6", h = "h-6" }: MoonSvgProps) {
  return (
    <div className={cls("relative", w, h)}>
      <svg
        className="absolute h-[100%] w-[100%] top-0 left-0"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-slate-400 opacity-50 dark:fill-blue-400 dark:opacity-100 transition-colors duration-300"
          d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
        />
        <path
          className="fill-slate-500 opacity-50 dark:fill-blue-500 dark:opacity-100 transition-colors duration-300"
          d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
        />
      </svg>
    </div>
  );
}
