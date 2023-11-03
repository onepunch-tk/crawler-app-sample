import React, { ChangeEvent, useState } from "react";
import {
  CardInputText,
  CardInputTitle,
  CardInputWrapper,
  CardSelect,
  CardTitle,
  CardWrapper,
  ITemType,
} from "@components/section-card";

const pageList: ITemType[] = [
  { id: "0", content: "1" },
  { id: "1", content: "2" },
  { id: "2", content: "3" },
  { id: "3", content: "4" },
  { id: "4", content: "5" },
];

export function InstaSearch() {
  const [selectedPage, setSelectedPage] = useState<ITemType>(pageList[0]);
  const [hashtag, setHashtag] = useState<string>("");

  const onHashtagInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const hashtagText = e.currentTarget.value;
    if (hashtagText.includes("#")) {
      return;
    }
    setHashtag(hashtagText);
  };

  return (
    <CardWrapper>
      <CardTitle title="해쉬태그 검색 페이지" />
      <CardInputWrapper>
        <CardInputTitle inputTitle="해쉬태그" />
        <CardInputText
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
          selectedItem={selectedPage}
          itemList={pageList}
          onSelectedHandler={setSelectedPage}
        />
      </CardInputWrapper>
    </CardWrapper>
  );
}
