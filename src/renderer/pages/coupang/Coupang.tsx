import {
  CardInputText,
  CardInputTitle,
  CardInputWrapper,
  CardSelect,
  CardSubmit,
  CardTitle,
  CardWrapper,
} from "@components/section-card";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { categoriesState } from "@recoil/coupang/atoms";

export function Coupang() {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstDepth, setFirstDepth] = useState<CP_FirstDepthCategory>();
  const [keyword, setKeyword] = useState<string>("");
  useEffect(() => {
    const getCategories = async () => {
      const { ok, error, results } = await electron.coupangApi.categories();
      if (ok) {
        setFirstDepth(results[0]);
        setCategories(results);
      }
    };
    getCategories();
  }, []);
  return (
    <main className="flex-box-col-center h-full">
      <CardWrapper width="w-[600px]">
        <CardTitle title="상품 검색" />
        <CardInputWrapper>
          <CardInputTitle inputTitle="카테고리" />
          {categories.length && firstDepth ? (
            <CardSelect
              loading={loading}
              selectedItem={firstDepth}
              itemList={categories}
              onSelectedHandler={setFirstDepth}
            />
          ) : null}

          {/*{selectedSecondDepth ? (*/}
          {/*  <CardSelect*/}
          {/*    loading={loading}*/}
          {/*    selectedItem={selectedSecondDepth}*/}
          {/*    itemList={selectedCategory.secondDepth}*/}
          {/*    onSelectedHandler={setSelectedSecondDepth}*/}
          {/*  />*/}
          {/*) : null}*/}
          {/*{selectedSecondDepth.thirdDepth ? (*/}
          {/*  <CardSelect*/}
          {/*    loading={loading}*/}
          {/*    selectedItem={*/}
          {/*      selectedThirdDepth*/}
          {/*        ? selectedThirdDepth*/}
          {/*        : selectedSecondDepth.thirdDepth[0]*/}
          {/*    }*/}
          {/*    itemList={selectedSecondDepth.thirdDepth}*/}
          {/*    onSelectedHandler={setSelectedThirdDepth}*/}
          {/*  />*/}
          {/*) : null}*/}
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
            isDisabled={loading}
          />
        </CardInputWrapper>
        <CardSubmit
          loading={loading}
          onSubmitHandler={async () => {}}
          content="상품 검색"
          subContent="불러오는 중..."
        />
      </CardWrapper>
    </main>
  );
}
