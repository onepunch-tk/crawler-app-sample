import { SvgContainerSizeType } from "@renderer/types";
import { cls } from "@utils/classnames";

type YoutubeSvgProps = SvgContainerSizeType & {
  classname: string;
};
export function YoutubeSvg({
  w = "w-6",
  h = "h-6",
  classname,
}: YoutubeSvgProps) {
  return (
    <div className={cls("relative", w, h)}>
      <svg
        className="absolute h-[100%] w-[100%] top-0 left-0"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={classname}
          d="M21,7.5c-0.2-0.8-0.8-1.4-1.7-1.7C17.8,5.4,12,5.4,12,5.4s-5.8,0-7.3,0.4C3.9,6,3.3,6.7,3,7.5 C2.7,8.9,2.7,12,2.7,12s0,3.1,0.4,4.5c0.2,0.8,0.8,1.4,1.7,1.7c1.5,0.4,7.3,0.4,7.3,0.4s5.8,0,7.3-0.4c0.8-0.2,1.4-0.9,1.7-1.7 c0.4-1.5,0.4-4.5,0.4-4.5S21.4,8.9,21,7.5z M10.1,14.8V9.2L15,12L10.1,14.8z"
        ></path>
      </svg>
    </div>
  );
}
