//Module
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//MiddleWare
import useLoginInput from "../Hooks/useLoginInput";
import useInput from "../Hooks/useInput";

// Styled-Component
import {
  LOGIN_WRAPPER,
  LOGIN_BOX,
  WRAPPER,
  STATE_CHANGER,
  FORM,
  LINK,
  INPUT,
  BUTTOIN,
  DARK_BUTTON,
  POP_UP,
} from "../styles/index";

export default () => {
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkloginInfo, setCheckLoginInfo] = useState(false);
  const [hover, sethover] = useState(false);
  const [action, setAction] = useState("login");
  const password = useLoginInput("");
  const rePassword = useLoginInput("");
  const id = useLoginInput("");
  const name = useInput("");
  const history = useHistory();

  //Handler
  const loginHandler = (e) => {
    e.preventDefault();
    fetch(
      `http://ec2-52-78-177-57.ap-northeast-2.compute.amazonaws.com:8000/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: id.value,
          password: password.value,
        }),
      }
    ).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          localStorage.setItem("Authentication", res.Authentication);
          alert("로그인에 성공하였습니다.");
          history.push("/login");
        });
      } else if (
        res.status === 400 ||
        res.status === 403 ||
        res.status === 401
      ) {
        alert("비밀번호 혹은 ID를 다시 확인해주세요");
      } else if (res.status === 500) {
        alert("일시적인 오류가 발생하였습니다.");
      }
    });
  };

  const registerHandler = (e) => {
    e.preventDefault();
    fetch(
      `http://ec2-52-78-177-57.ap-northeast-2.compute.amazonaws.com:8000/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: id.value,
          name: name.value,
          password: rePassword.value,
        }),
      }
    ).then((res) => {
      if (res.status === 201) {
        alert("회원가입에 성공하였습니다.");
        setAction("logIn");
      } else if (res.status === 500) {
        alert("일시적인 오류가 발생하였습니다.");
      } else if (res.status === 400 && res.message === "UNUSABLE VALUE") {
        alert("이미 가입된 ID입니다.");
      } else if (res.status === 400) {
        alert("정보를 입력해주세요");
      }
    });
  };

  const onlogindHandler = () => {
    if (password.value.length >= 5 && id.value.length >= 3) {
      setCheckLoginInfo(true);
    } else {
      setCheckLoginInfo(false);
    }
  };

  const onPasswordHandler = () => {
    if (
      password.value === rePassword.value &&
      password.value.length >= 5 &&
      id.value.length >= 3
    ) {
      setCheckPassword(true);
    }
    if (password.value !== rePassword.value) setCheckPassword(false);
  };

  const hoverHandler = () => {
    sethover(true);
  };

  const outHandler = () => {
    sethover(false);
  };

  useEffect(() => {
    onPasswordHandler();
    onlogindHandler();
  }, [password, rePassword, id]);

  return (
    <LOGIN_WRAPPER>
      {" "}
      (
      <WRAPPER>
        <LOGIN_BOX>
          <FORM>
            {action === "logIn" ? (
              <form>
                <INPUT placeholder={"ID 영문 숫자 조합 3자리 이상"} {...id} />
                <h6>*3자리 이상 기입</h6>
                <INPUT
                  placeholder={"Password 영문 숫자 조합 5자리 이상"}
                  {...password}
                  type="password"
                />
                <h6>*5자리 이상 기입</h6>
                {checkloginInfo ? (
                  <BUTTOIN onClick={loginHandler}>Log in</BUTTOIN>
                ) : (
                  <DARK_BUTTON> Log in </DARK_BUTTON>
                )}
              </form>
            ) : (
              <form>
                <h6>ID</h6>
                <INPUT placeholder={"ID 영문 숫자 조합 3자리 이상"} {...id} />
                <h6>Nickname</h6>
                <INPUT placeholder={"name"} {...name} />
                <h6>Password</h6>
                <INPUT
                  placeholder={"Password 영문 숫자 조합 5자리 이상"}
                  {...password}
                  type="password"
                />
                <INPUT
                  placeholder={"RePassword"}
                  {...rePassword}
                  type="password"
                />
                {checkPassword ? (
                  <BUTTOIN onClick={registerHandler}>Sign up</BUTTOIN>
                ) : (
                  <DARK_BUTTON
                    onMouseEnter={hoverHandler}
                    onMouseLeave={outHandler}
                  >
                    Sign up
                  </DARK_BUTTON>
                )}
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
        <POP_UP>
          {hover ? "기입한 정보를 다시 확인해주세요" : "방문을 환영합니다."}
        </POP_UP>
      </WRAPPER>
    </LOGIN_WRAPPER>
  );
};
