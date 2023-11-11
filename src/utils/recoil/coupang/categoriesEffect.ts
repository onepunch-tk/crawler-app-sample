import { AtomEffect } from "recoil";

export const categoriesEffect: AtomEffect<CP_FirstDepthCategory[]> = ({
  setSelf,
}) => {
  // 비동기 작업은 AtomEffect 내에서 직접 수행하지 않음
  // 대신 useEffect를 사용
};
