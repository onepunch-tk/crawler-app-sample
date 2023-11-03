import React from "react";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { instagramAuthState } from "@recoil/instagram/atoms";
import { InstaAuth } from "@pages/instagram/InstaAuth";

export function Instagram() {
  const test = useRecoilValue(instagramAuthState);
  return (
    <main className="flex-box-col-center h-full">
      {test ? <Outlet /> : <InstaAuth />}
    </main>
  );
}
