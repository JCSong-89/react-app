import React, { useState } from "react";

import {
  LOGIN_WRAPPER,
  LOGIN_BOX,
  WRAPPER,
  STATE_CHANGER,
  FORM,
  LINK,
  INPUT,
  BUTTOIN,
} from "../styles/index";
import useInput from "../Hooks/useInput";

export default () => {
  const [action, setAction] = useState("login");
  const password = useInput("");
  const id = useInput("");
  const name = useInput("");

  const loginHandler = () => {
    fetch(`http://localhost:4000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: id.value,
        password: password.value,
      }),
    }).then(function innerFunc(res) {
      if (res.status === 200) {
        res
          .json()
          .then((res) =>
            localStorage.setItem("Authentication", res.Authentication)
          );
        alert("로그인에 성공하였습니다.");
      } else if (res.status === 400) {
        alert("비밀번호 혹은 ID를 다시 확인해주세요");
      } else if (res.status === 500) {
        alert("일시적인 오류가 발생하였습니다.");
      }
    });
  };

  const registerHandler = () => {
    fetch(`http://localhost:4000/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: id.value,
        name: name.value,
        password: password.value,
      }),
    }).then(function innerFunc(res) {
      if (res.status === 201) {
        // signin.status가 200일 경우 로그인 성공
        alert("회원가입에 성공하였습니다.");
        setAction("logIn");
      } else if (res.status === 400) {
        alert("비밀번호 혹은 ID를 다시 확인해주세요");
      } else if (res.status === 500) {
        alert("일시적인 오류가 발생하였습니다.");
      }
    });
  };

  return (
    <LOGIN_WRAPPER>
      <WRAPPER>
        <LOGIN_BOX>
          <FORM>
            {action === "logIn" ? (
              <form>
                <INPUT placeholder={"ID"} {...id} />
                <INPUT placeholder={"Password"} {...password} type="password" />
                <BUTTOIN onClick={loginHandler}>Log in</BUTTOIN>
              </form>
            ) : (
              <form>
                <INPUT placeholder={"ID"} {...id} />
                <INPUT placeholder={"name"} {...name} />
                <INPUT placeholder={"Password"} {...password} type="password" />
                <BUTTOIN onClick={registerHandler}>Sign up</BUTTOIN>
              </form>
            )}
          </FORM>
        </LOGIN_BOX>
        <LOGIN_BOX>
          <STATE_CHANGER>
            {action === "logIn" ? (
              <>
                계정이 없으신가요?{" "}
                <LINK onClick={() => setAction("signUp")}>Sign up</LINK>
              </>
            ) : (
              <>
                이미 가입하셨나요?{" "}
                <LINK onClick={() => setAction("logIn")}>Log in</LINK>
              </>
            )}
          </STATE_CHANGER>
        </LOGIN_BOX>
      </WRAPPER>
    </LOGIN_WRAPPER>
  );
};
