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
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { categoriesState } from "@recoil/coupang/atoms";
import { WORK_KEY, workState } from "@recoil/common/atoms";
import { Loading } from "@components/Loading";

const pageList: ItemType[] = [
  { id: "0", content: "1" },
  { id: "1", content: "2" },
  { id: "2", content: "3" },
  { id: "3", content: "4" },
  { id: "4", content: "5" },
];

enum SORTER {
  RANKING_ASC = "none" /*쿠팡 랭킹 순*/,
  SALE_PRICE_ASC = "salePriceAsc" /*낮은 가격순*/,
  SALE_PRICE_DESC = "salePriceDesc" /*높은 가격순*/,
  SALE_COUNT_DESC = "saleCountDesc" /*판매량 순*/,
  LATEST_ASC = "latestAsc" /*최신순*/,
}

type Sorter = ItemType & {
  sorter: SORTER;
};

const sorterList: Sorter[] = [
  { id: "0", sorter: SORTER.RANKING_ASC, content: "쿠팡 랭킹" },
  { id: "1", sorter: SORTER.SALE_PRICE_ASC, content: "낮은 가격" },
  { id: "2", sorter: SORTER.SALE_PRICE_DESC, content: "높은 가격" },
  { id: "3", sorter: SORTER.SALE_COUNT_DESC, content: "판매량" },
  { id: "4", sorter: SORTER.LATEST_ASC, content: "최신" },
];

const viewCountList: ItemType[] = [
  {
    id: "0",
    content: "36",
  },
  {
    id: "1",
    content: "48",
  },
  {
    id: "2",
    content: "60",
  },
  {
    id: "3",
    content: "72",
  },
];

export function Coupang() {
  const [{ init, categories }, setCategories] = useRecoilState(categoriesState);
  const [work, setWorkState] = useRecoilState(workState);
  const [firstDepth, setFirstDepth] = useState<CP_FirstDepthCategory>();
  const [secondDepth, setSecondDepth] = useState<CP_SecondDepthCategory>();
  const [thirdDepth, setThirdDepth] = useState<CP_DefaultCategory>();
  const [page, setPage] = useState<ItemType>(pageList[0]);
  const [sorter, setSorter] = useState<Sorter>(sorterList[0]);
  const [viewCount, setViewCount] = useState<ItemType>(viewCountList[0]);
  const [rocketDelivery, setRocketDelivery] = useState(false);
  const [adBlock, setAdBlock] = useState(true);
  const [productName, setProductName] = useState<string>("");

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
  const selectedSorter = (selectedSorter: Sorter) => setSorter(selectedSorter);
  const selectedViewCount = (selectedViewCount: ItemType) =>
    setViewCount(selectedViewCount);
  const onProducts = () => {
    electron.coupangApi.onProducts((e, productsResponse) => {
      console.log(productsResponse);
      setWorkState({ isWork: false, workKey: WORK_KEY.DONE });
    });
  };
  const cp_crawler = async () => {
    if (!productName) return;
    let searchId: string;
    if (thirdDepth && !thirdDepth.id.includes("none")) {
      searchId = thirdDepth.id;
    } else if (secondDepth && !secondDepth.id.includes("none")) {
      searchId = secondDepth.id;
    } else {
      searchId = firstDepth.id;
    }
    setWorkState({ isWork: true, workKey: WORK_KEY.CP_PRODUCT });
    await electron.coupangApi.getProducts({
      searchId,
      productName,
      rocketDelivery,
      pageNumber: parseInt(page.content),
      sorter: sorter.sorter,
      listSize: 36,
      adBlock,
    });
    onProducts();
  };
  useEffect(() => {
    if (!init) {
      const getCategories = async () => {
        setWorkState({ isWork: true, workKey: WORK_KEY.CP_CATEGORY });
        const { ok, error, results } = await electron.coupangApi.categories();
        if (ok) {
          selectedFirstDepth(results[0]);
          setCategories({ init: true, categories: results });
        }
        setWorkState({ isWork: false, workKey: WORK_KEY.DONE });
      };
      getCategories();
    }
  }, [init]);
  if (work.isWork) {
    let message: string;
    switch (work.workKey) {
      case WORK_KEY.CP_CATEGORY:
        message = "카테고리 불러오는 중...";
        break;
      case WORK_KEY.CP_PRODUCT:
        message = "상품 스크래핑 중...";
        break;
    }

    return (
      <Loading message={message} containerBg="bg-amber-400 dakr:bg-amber-500" />
    );
  }
  return (
    <main className="flex-box-col-center h-full">
      <CardWrapper width="w-[650px]">
        <CardTitle title="상품 검색" />
        <CardInputWrapper mb="mb-7">
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
        <CardInputWrapper mb="mb-7">
          <CardInputTitle inputTitle="상품명" />
          <CardInputText
            onChangeHandler={(e: ChangeEvent<HTMLInputElement>) =>
              setProductName(e.currentTarget.value)
            }
            value={productName}
            placeholder="검색할 상품명 입력"
            inputType="text"
          />
        </CardInputWrapper>
        <CardInputWrapper mb="mb-7">
          <CardInputTitle inputTitle="페이지" />
          <CardSelect
            selectedItem={page}
            itemList={pageList}
            onSelectedHandler={(page: ItemType) => setPage(page)}
          />
        </CardInputWrapper>
        <div className="relative flex-box-col-center py-5 space-y-5 items-center px-10 border border-amber-600 dark:border-amber-500 w-full rounded-md mb-5">
          <label className="absolute top-[-15px] left-center block px-3 box-light-bg dark:box-dark-bg">
            옵션
          </label>
          <div className="flex w-full space-x-5">
            <CardInputWrapper>
              <CardInputTitle inputTitle="로켓 배송" />
              <div
                className="relative w-5 h-5 bg-transparent cursor-pointer border-2 border-amber-600 dark:border-amber-500 rounded-md flex justify-center items-center"
                onClick={() => setRocketDelivery((prev) => !prev)}
              >
                {rocketDelivery ? (
                  <svg
                    className="h-8 w-8 text-green-700 dark:text-green-600 absolute top-[-0.7rem]"
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
              <CardInputTitle inputTitle="광고 제외" />
              <div
                className="relative w-5 h-5 bg-transparent cursor-pointer border-2 border-amber-600 dark:border-amber-500 rounded-md flex justify-center items-center"
                onClick={() => setAdBlock((prev) => !prev)}
              >
                {adBlock ? (
                  <svg
                    className="h-8 w-8 text-green-700 dark:text-green-600 absolute top-[-0.7rem]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
                  </svg>
                ) : null}
              </div>
            </CardInputWrapper>
          </div>

          <CardInputWrapper>
            <CardInputTitle inputTitle="정렬" />
            <CardSelect
              w="w-32"
              selectedItem={sorter}
              itemList={sorterList}
              onSelectedHandler={selectedSorter}
            />
          </CardInputWrapper>
          <CardInputWrapper>
            <CardInputTitle inputTitle="보기" />
            <CardSelect
              w="w-32"
              selectedItem={viewCount}
              itemList={viewCountList}
              onSelectedHandler={selectedViewCount}
            />
          </CardInputWrapper>
        </div>
        <CardSubmit
          onSubmitHandler={cp_crawler}
          content="상품 검색"
          subContent="불러오는 중..."
        />
      </CardWrapper>
    </main>
  );
}
