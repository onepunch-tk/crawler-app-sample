import {
  CardInputTitle,
  CardInputWrapper,
  CardSelect,
  CardTitle,
  CardWrapper,
  ItemType,
} from "@components/section-card";
import { useState } from "react";

const testItems: ItemType[] = [
  {
    id: "0",
    content: "test",
  },
];

export function Coupang() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ItemType>(testItems[0]);
  return (
    <main className="flex-box-col-center h-full">
      <CardWrapper>
        <CardTitle title="상품 검색" />
        <CardInputWrapper>
          <CardInputTitle inputTitle="Category" />
          <div className="flex space-x-5">
            <CardSelect
              loading={loading}
              selectedItem={selectedItem}
              itemList={testItems}
              onSelectedHandler={setSelectedItem}
            />
            <CardSelect
              loading={loading}
              selectedItem={selectedItem}
              itemList={testItems}
              onSelectedHandler={setSelectedItem}
            />
            <CardSelect
              loading={loading}
              selectedItem={selectedItem}
              itemList={testItems}
              onSelectedHandler={setSelectedItem}
            />
          </div>
        </CardInputWrapper>

        <CardInputTitle inputTitle="Category" />
        <CardInputTitle inputTitle="Categoryfasdfsdafafasfads" />
      </CardWrapper>
    </main>
  );
}
