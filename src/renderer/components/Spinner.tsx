import { cls } from "@utils/classnames";
import {
  SpinBorderColorType,
  SpinHeightType,
  SpinWidthType,
} from "@renderer/types";

interface SpinnerProps {
  w: SpinWidthType;
  h: SpinHeightType;
  borderColor?: SpinBorderColorType;
}
export function Spinner({ w, h, borderColor }: SpinnerProps) {
  return (
    <div
      className={cls(
        "loading-spinner inline-block animate-spin rounded-full border-4 border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
        w,
        h,
        borderColor
      )}
    ></div>
  );
}
