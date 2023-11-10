import React, { ChangeEvent, useState } from "react";
import {
  CardInputText,
  CardInputTitle,
  CardInputWrapper,
  CardSelect,
  CardSubmit,
  CardTitle,
  CardWrapper,
  ITemType,
} from "@components/section-card";
import { useSetRecoilState } from "recoil";
import { instagramAuthState } from "@recoil/instagram/atoms";
import { ERROR, STATUS } from "@utils/ipc/responses/instagram/response-type";

const pageList: ITemType[] = [
  { id: "0", content: "1" },
  { id: "1", content: "2" },
  { id: "2", content: "3" },
  { id: "3", content: "4" },
  { id: "4", content: "5" },
];

export function InstaSearch() {
  const [selectedItem, setSelectedItem] = useState<ITemType>(pageList[0]);
  const [hashtag, setHashtag] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const setAuthUser = useSetRecoilState(instagramAuthState);
  const onHashtagInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const hashtagText = e.currentTarget.value;
    if (hashtagText.includes("#")) {
      return;
    }
    setHashtag(hashtagText);
  };

  const onSearchingHandler = async () => {
    if (!hashtag) return;

    setLoading(true);

    const pageCount = parseInt(selectedItem.content);
    const { status, urls, error } =
      await electron.instagramApi.getHashtagPageList({
        hashtag,
        pageCount,
      });

    if (status === STATUS.FAILURE) {
      if (error === ERROR.UNAUTHENTICATED) {
        setAuthUser("");
      }
      setLoading(false);
      return;
    }
  };

  return (
    <CardWrapper>
      <CardTitle title="해쉬태그 검색 페이지" />
      <CardInputWrapper>
        <CardInputTitle inputTitle="해쉬태그" />
        <CardInputText
          isDisabled={loading}
          onChangeHandler={onHashtagInputHandler}
          value={hashtag}
          placeholder="Hashtag..."
          inputType="text"
          symbol="#"
        />
      </CardInputWrapper>
      <CardInputWrapper>
        <CardInputTitle inputTitle="페이지 수" />
        <CardSelect
          loading={loading}
          selectedItem={selectedItem}
          itemList={pageList}
          onSelectedHandler={setSelectedItem}
        />
      </CardInputWrapper>
      <CardSubmit
        loading={loading}
        onSubmitHandler={onSearchingHandler}
        content="Start"
        subContent="Crawling"
      />
    </CardWrapper>
  );
}
