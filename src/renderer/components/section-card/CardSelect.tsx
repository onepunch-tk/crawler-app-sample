import { cls } from "@utils/classnames";
import React, { PropsWithChildren, useRef } from "react";
import { ITemType } from "@components/section-card/index";

function ItemWrapper({ children }: PropsWithChildren) {
  return <div className="flex items-center space-x-5 w-8">{children}</div>;
}

type CardSelectProps = {
  loading: boolean;
  selectedItem: ITemType;
  itemList: ITemType[];
  onSelectedHandler: React.Dispatch<React.SetStateAction<ITemType>>;
};
export function CardSelect({
  loading,
  selectedItem,
  itemList,
  onSelectedHandler,
}: CardSelectProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const listViewerRef = useRef<HTMLButtonElement>(null);
  const onListVisibleHandler = (visible: boolean) => {
    if (loading) {
      return;
    }
    const defaultCls =
      "absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-neutral-400 dark:bg-neutral-700 py-1 shadow-box dark:shadow-box-dark ring-1 ring-neutral-400 dark:ring-neutral-700 text-sm transition-opacity duration-300 ease-in-out";
    const opacity = "opacity-100";
    const invisible = "invisible opacity-0";
    if (listRef) {
      listRef.current.className = visible
        ? cls(defaultCls, opacity)
        : cls(defaultCls, invisible);
      visible && listRef.current.focus();
    }
  };
  return (
    <div className="relative">
      <button
        ref={listViewerRef}
        onClick={() => onListVisibleHandler(true)}
        type="button"
        className="relative w-full cursor-default rounded-md bg-neutral-400 dark:bg-neutral-700  pl-2 pr-8 text-left shadow-box dark:shadow-box-dark ring-1 ring-amber-600 dark:ring-amber-500 focus:ring-2 hover:ring-2 text-sm"
      >
        <ItemWrapper>
          <span>{selectedItem.content}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2 text-green-700">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" />
            </svg>
          </span>
        </ItemWrapper>
      </button>
      <ul
        ref={listRef}
        className={cls(
          "absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-neutral-400 dark:bg-neutral-700 py-1 shadow-box dark:shadow-box-dark ring-1 ring-neutral-400 dark:ring-neutral-700 text-sm transition-opacity duration-300 ease-in-out invisible opacity-0"
        )}
        onBlur={(e) => {
          if (e.relatedTarget === listViewerRef.current) return;
          onListVisibleHandler(false);
        }}
        tabIndex={-1}
      >
        {itemList.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              onSelectedHandler(item);
              onListVisibleHandler(false);
            }}
            className="cursor-default relative select-none rounded-sm pl-3 pr-9 hover:bg-amber-400 hover:text-neutral-900 hover:opacity-80"
          >
            <ItemWrapper>
              <span>{item.content}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2 text-green-700">
                {selectedItem.id === item.id ? (
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2 text-green-700">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
                    </svg>
                  </span>
                ) : null}
              </span>
            </ItemWrapper>
          </li>
        ))}
      </ul>
    </div>
  );
}
