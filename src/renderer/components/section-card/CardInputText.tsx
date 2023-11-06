import React, {
  ChangeEventHandler,
  Fragment,
  HTMLInputTypeAttribute,
} from "react";
import { cls } from "@utils/classnames";

type CardInputProps = {
  onChangeHandler: ChangeEventHandler;
  value: string;
  placeholder: string;
  inputType: HTMLInputTypeAttribute;
  isDisabled: boolean;
  symbol?: string;
};
export function CardInputText({
  onChangeHandler,
  value,
  placeholder,
  inputType,
  symbol,
  isDisabled,
}: CardInputProps) {
  return (
    <Fragment>
      <div className="relative">
        {symbol ? (
          <div className="absolute left-0 text-neutral-800 dark:text-neutral-400 opacity-70 dark:opacity-100">
            {symbol}
          </div>
        ) : null}
        <input
          disabled={isDisabled}
          onChange={onChangeHandler}
          value={value}
          type={inputType}
          placeholder={placeholder}
          onFocus={(e) => (e.currentTarget.placeholder = "")}
          onBlur={(e) => (e.currentTarget.placeholder = placeholder)}
          className={cls(
            "w-52 placeholder-neutral-500 placeholder:text-center placeholder:opacity-60 bg-transparent focus:outline-0 box-border border-b dark:border-b-[0.5px] focus:border-b-2 dark:focus:border-b border-amber-600 dark:border-amber-500 text-sm",
            symbol ? "pl-3" : ""
          )}
        />
      </div>
    </Fragment>
  );
}
