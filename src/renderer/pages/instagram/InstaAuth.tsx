import {
  CardInputText,
  CardInputTitle,
  CardInputWrapper,
  CardSubmit,
  CardTitle,
  CardWrapper,
} from "@components/section-card";
import React, { ChangeEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { instagramAuthState } from "@recoil/instagram/atoms";

export function InstaAuth() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const setInstaAuth = useSetRecoilState(instagramAuthState);
  const onSignInHandler = async () => {
    if (!id) return;
    if (!password) return;
    setLoading(true);
    const { authenticated, userId } = await electron.instagramApi.signIn({
      id,
      password,
    });
    //setInstaAuth({ id, password });
    if (authenticated) {
      setInstaAuth(userId);
    }
  };
  return (
    <CardWrapper>
      <CardTitle title="Instagram Sign In" />
      <CardInputWrapper>
        <CardInputTitle inputTitle="ID" />
        <CardInputText
          isDisabled={loading}
          onChangeHandler={(e: ChangeEvent<HTMLInputElement>) =>
            setId(e.currentTarget.value)
          }
          value={id}
          placeholder="전화번호, 사용자 이름 또는 이메일"
          inputType="text"
        />
      </CardInputWrapper>
      <CardInputWrapper>
        <CardInputTitle inputTitle="해쉬태그" />
        <CardInputText
          isDisabled={loading}
          onChangeHandler={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.currentTarget.value)
          }
          value={password}
          placeholder="비밀번호"
          inputType="password"
        />
      </CardInputWrapper>
      <CardSubmit
        loading={loading}
        onSubmitHandler={onSignInHandler}
        content="Sign in"
        subContent="Loading"
      />
    </CardWrapper>
  );
}
