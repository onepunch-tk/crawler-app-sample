import { cls } from "@utils/classnames";
import React, { ChangeEvent, useEffect, useState } from "react";

function CheckMark() {
  return (
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
  );
}

function UpDownMark() {
  return (
    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2 text-green-700">
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" />
      </svg>
    </span>
  );
}

type SelectItemProps = {
  isCheckMark: boolean;
  pageInfo: PageType;
  selectedPageId?: number;
};
function SelectItem({
  isCheckMark,
  pageInfo,
  selectedPageId,
}: SelectItemProps) {
  return (
    <div className="flex items-center space-x-5 w-8">
      <span>{pageInfo.count}</span>
      {!isCheckMark ? (
        <UpDownMark />
      ) : pageInfo.id === selectedPageId ? (
        <CheckMark />
      ) : null}
    </div>
  );
}

const outSideClickHandler = (
  e: MouseEvent,
  setListVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const viewBtnEl = document.querySelector("#listbox-btn");
  const listBoxEl = document.querySelector("#listbox");
  if (viewBtnEl && listBoxEl) {
    const childEl = e.target as Element;
    if (!viewBtnEl.contains(childEl) && !listBoxEl.contains(childEl)) {
      setListVisible(false);
    }
  }
};

type PageType = {
  id: number;
  count: number;
};

const pageInfoList: PageType[] = [
  { id: 0, count: 1 },
  { id: 1, count: 2 },
  { id: 2, count: 3 },
  { id: 3, count: 4 },
  { id: 4, count: 5 },
];

export function Search() {
  const [selectedPage, setSelectedPage] = useState<PageType>(pageInfoList[0]);
  const [listVisible, setListVisible] = useState(false);
  const [hashtag, setHashtag] = useState<string>("");
  const onListVisibleHandler = () => {
    setListVisible((prev) => !prev);
  };

  const onHashtagInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const hashtagText = e.currentTarget.value;
    if (hashtagText.includes("#")) {
      return;
    }
    setHashtag(hashtagText);
  };

  useEffect(() => {
    document.addEventListener("click", (e) =>
      outSideClickHandler(e, setListVisible)
    );
    return () =>
      document.removeEventListener("click", (e) => outSideClickHandler);
  }, []);

  return (
    <section className="flex-box-col-center box-light-bg dark:box-dark-bg w-1/2 min-w-[350px] rounded-md p-10 shadow-box dark:shadow-box-dark transition-[border-color,box-shadow] duration-300 h-40">
      <h2 className="text-lg mb-7 font-bold cursor-default">
        해쉬태그 검색 페이지
      </h2>
      <div className="flex w-full justify-items-start items-center h-5 mb-5">
        <div className="w-16 flex justify-between items-center text-sm font-semibold mr-3">
          <label>해쉬태그</label>
          <label>:</label>
        </div>
        <div className="relative">
          <div className="absolute left-0 opacity-30">#</div>
          <input
            onChange={onHashtagInputHandler}
            value={hashtag}
            type="text"
            placeholder="Hashtag..."
            onFocus={(e) => (e.currentTarget.placeholder = "")}
            onBlur={(e) => (e.currentTarget.placeholder = "Hashtag...")}
            className="pl-3 placeholder:opacity-30 bg-transparent focus:outline-0 box-border border-b dark:border-b-[0.5px] focus:border-b-2 dark:focus:border-b border-amber-600 dark:border-amber-500 text-sm"
          />
        </div>
      </div>
      <div className="flex w-full justify-items-start items-center h-5">
        <div className="w-16 flex justify-between items-center text-sm font-semibold mr-3">
          <label>페이지 수</label>
          <label>:</label>
        </div>
        <div className="relative">
          <button
            onClick={onListVisibleHandler}
            id="listbox-btn"
            type="button"
            className="relative w-full cursor-default rounded-md bg-neutral-400 dark:bg-neutral-700  pl-2 pr-8 text-left shadow-box dark:shadow-box-dark ring-1 ring-amber-600 dark:ring-amber-500 focus:ring-2 hover:ring-2 text-sm"
          >
            <SelectItem isCheckMark={false} pageInfo={selectedPage} />
          </button>
          <ul
            id="listbox"
            className={cls(
              "absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-neutral-400 dark:bg-neutral-700 py-1  shadow-box dark:shadow-box-dark ring-1 ring-neutral-400 dark:ring-neutral-700 text-sm transition-opacity duration-300 ease-in-out",
              listVisible ? "opacity-100" : "invisible opacity-0"
            )}
            tabIndex={-1}
          >
            {pageInfoList.map((pageInfo) => (
              <li
                key={pageInfo.id}
                onClick={() => {
                  setSelectedPage(pageInfo);
                  setListVisible(false);
                }}
                className="cursor-default relative select-none rounded-sm pl-3 pr-9 hover:bg-amber-400 hover:text-neutral-900 hover:opacity-80"
              >
                <SelectItem
                  isCheckMark={true}
                  pageInfo={pageInfo}
                  selectedPageId={selectedPage.id}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
