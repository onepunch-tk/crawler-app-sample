import {
  CardInputText,
  CardInputTitle,
  CardInputWrapper,
  CardSelect,
  CardSubmit,
  CardTitle,
  CardWrapper,
  ItemType,
} from "@components/section-card";
import React, { ChangeEvent, Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import { categoriesState } from "@recoil/coupang/atoms";
import { workState } from "@recoil/common/atoms";
import { Loading } from "@components/Loading";

const pageList: ItemType[] = [
  { id: "0", content: "1" },
  { id: "1", content: "2" },
  { id: "2", content: "3" },
  { id: "3", content: "4" },
  { id: "4", content: "5" },
];

enum SORTER {
  SALE_COUNT_DESC = "saleCountDesc",
  LATEST_ASC = "latestAsc",
  SALE_PRICE_DESC = "salePriceDesc",
  SALE_PRICE_ASC = "salePriceAsc",
}

type Sorter = {
  id: string;
  sorter: SORTER;
};

const sorterList: Sorter[] = [
  { id: "0", sorter: SORTER.SALE_COUNT_DESC },
  { id: "1", sorter: SORTER.LATEST_ASC },
  { id: "2", sorter: SORTER.SALE_PRICE_ASC },
  { id: "3", sorter: SORTER.SALE_PRICE_DESC },
];

export function Coupang() {
  const [{ init, categories }, setCategories] = useRecoilState(categoriesState);
  const [loading, setLoading] = useRecoilState(workState);
  const [firstDepth, setFirstDepth] = useState<CP_FirstDepthCategory>();
  const [secondDepth, setSecondDepth] = useState<CP_SecondDepthCategory>();
  const [thirdDepth, setThirdDepth] = useState<CP_DefaultCategory>();
  const [page, setPage] = useState<ItemType>(pageList[0]);
  const [sorter, setSorter] = useState<Sorter>(sorterList[0]);
  const [checked, setChecked] = useState(false);
  const [keyword, setKeyword] = useState<string>("");

  const selectedFirstDepth = (selectedFirstDepth: CP_FirstDepthCategory) => {
    setThirdDepth(null);
    setSecondDepth(null);
    setFirstDepth(selectedFirstDepth);
    if (selectedFirstDepth.secondDepth) {
      setSecondDepth(selectedFirstDepth.secondDepth[0]);
    }
  };
  const selectedSecondDepth = (selectedSecondDepth: CP_SecondDepthCategory) => {
    setThirdDepth(null);
    setSecondDepth(selectedSecondDepth);
    if (selectedSecondDepth.thirdDepth) {
      setThirdDepth(selectedSecondDepth.thirdDepth[0]);
    }
  };
  // useEffect(() => {
  //   if (!init) {
  //     const getCategories = async () => {
  //       setLoading(true);
  //       const { ok, error, results } = await electron.coupangApi.categories();
  //       if (ok) {
  //         selectedFirstDepth(results[0]);
  //         setCategories({ init: true, categories: results });
  //       }
  //       setLoading(false);
  //     };
  //     getCategories();
  //   }
  // }, [init]);
  if (loading) {
    return (
      <Loading
        message="카테고리 불러오는 중..."
        containerBg="bg-amber-400 dakr:bg-amber-500"
      />
    );
  }
  return (
    <main className="flex-box-col-center h-full">
      <CardWrapper width="w-[650px]">
        <CardTitle title="상품 검색" />
        <CardInputWrapper>
          <CardInputTitle inputTitle="카테고리" />
          {categories.length ? (
            <div className="flex justify-center items-center space-x-3">
              <CardSelect
                w="w-32"
                selectedItem={firstDepth ? firstDepth : categories[0]}
                itemList={categories}
                onSelectedHandler={selectedFirstDepth}
              />
              {firstDepth?.secondDepth ? (
                <Fragment>
                  <span>&rarr;</span>
                  <CardSelect
                    w="w-32"
                    selectedItem={
                      secondDepth ? secondDepth : firstDepth.secondDepth[0]
                    }
                    itemList={firstDepth.secondDepth}
                    onSelectedHandler={selectedSecondDepth}
                  />
                </Fragment>
              ) : null}
              {secondDepth?.thirdDepth ? (
                <Fragment>
                  <span>&rarr;</span>
                  <CardSelect
                    w="w-32"
                    selectedItem={
                      thirdDepth ? thirdDepth : secondDepth.thirdDepth[0]
                    }
                    itemList={secondDepth.thirdDepth}
                    onSelectedHandler={(
                      selectedThirdDepth: CP_DefaultCategory
                    ) => setThirdDepth(selectedThirdDepth)}
                  />
                </Fragment>
              ) : null}
            </div>
          ) : null}
        </CardInputWrapper>
        <CardInputWrapper>
          <CardInputTitle inputTitle="상품명" />
          <CardInputText
            onChangeHandler={(e: ChangeEvent<HTMLInputElement>) =>
              setKeyword(e.currentTarget.value)
            }
            value={keyword}
            placeholder="검색할 상품명 입력"
            inputType="text"
          />
        </CardInputWrapper>
        <CardInputWrapper>
          <CardInputTitle inputTitle="페이지" />
          <CardSelect
            selectedItem={page}
            itemList={pageList}
            onSelectedHandler={(page: ItemType) => setPage(page)}
          />
        </CardInputWrapper>
        <CardInputWrapper>
          <CardInputTitle inputTitle="로켓 배송" />
          <div
            className="relative w-5 h-5 bg-transparent cursor-pointer border-2 border-amber-400 rounded-md flex justify-center items-center"
            onClick={() => setChecked((prev) => !prev)}
          >
            {checked ? (
              <svg
                className="h-6 w-6 text-green-700 absolute"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
              </svg>
            ) : null}
          </div>
        </CardInputWrapper>
        <CardInputWrapper>
          {sorterList.map((sort) => (
            <div key={sort.id}>
              <CardInputTitle inputTitle={sort.sorter} />
              <div
                className="relative w-5 h-5 bg-transparent cursor-pointer border-2 border-amber-400 rounded-md flex justify-center items-center"
                onClick={() => setSorter(sort)}
              >
                {sorter.sorter === sort.sorter ? (
                  <svg
                    className="h-6 w-6 text-green-700 absolute"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
                  </svg>
                ) : null}
              </div>
            </div>
          ))}
        </CardInputWrapper>
        <CardSubmit
          onSubmitHandler={async () => {}}
          content="상품 검색"
          subContent="불러오는 중..."
        />
      </CardWrapper>
    </main>
  );
}
