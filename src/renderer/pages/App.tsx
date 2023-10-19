import { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { onlineState } from "@recoil/online/atoms";
import { Loading } from "@components/Loading";

export function App() {
  const connected = useRecoilValue(onlineState);
  if (!connected) {
    return (
      <Loading
        containerBg="bg-red-500"
        message="접속이 끊겼습니다. 인터넷 연결 상태를 확인하여 주세요!"
      />
    );
  }
  return (
    <Fragment>
      <main className="mt-10">
        <h1>Hello World</h1>
        <h1>Hello World</h1>
      </main>
    </Fragment>
  );
}
