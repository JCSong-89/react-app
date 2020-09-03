//Module
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

//MiddleWare
import { checkProfile } from "../../redux/Home.readux";
import useInput from "../../Hooks/useInput";
import useLoginInput from "../../Hooks/useLoginInput";

// Styled-Component
import {
  CENTER_COLUMN,
  HEADER_COLUMN,
  INPUT,
  BUTTOIN,
  DARK_BUTTON,
  RED_COLUMN,
} from "../../styles/index";

const Profile = ({ userProfile }) => {
  const password = useLoginInput(false);
  const rePassword = useInput(false);
  const name = useInput(userProfile.data.name);
  const [completed, setCompleted] = useState(true);
  const [checkPassword, setCheckPassword] = useState(true);
  const [hover, sethover] = useState(false);

  //handler
  const onUpdateSubmit = (e) => {
    e.preventDefault();
    axios
      .request({
        url: `/profile`,
        method: "post",
        baseURL:
          "http://ec2-52-78-177-57.ap-northeast-2.compute.amazonaws.com:8000",
        headers: { Authentication: localStorage.getItem("Authentication") },
        data: {
          password: password.value,
          name: name.value,
        },
      })
      .then((res) => {
        if (res.status !== 200) {
          alert("정보 수정에 실패하였습니다.");
        } else {
          alert("정보 수정 완료");
          setCompleted(false);
        }
      });
  };

  const onPasswordHandler = () => {
    if (password.value === rePassword.value && password.value.length >= 5)
      setCheckPassword(true);
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
  }, [password, rePassword]);

  return (
    <>
      {completed ? (
        <form>
          <CENTER_COLUMN></CENTER_COLUMN>
          <HEADER_COLUMN>
            <h5>이름</h5>
            <INPUT placeholder={`${userProfile.data.name}`} {...name} />{" "}
          </HEADER_COLUMN>
          <HEADER_COLUMN>
            <h5>새 비밀번호</h5>
            <INPUT
              placeholder={"비밀번호를 입력해주세요."}
              {...password}
              type="password"
            />
          </HEADER_COLUMN>
          <HEADER_COLUMN>
            <h5>비밀번호 재확인 </h5>
            <INPUT
              placeholder={"다시 입력해주세요."}
              {...rePassword}
              type="password"
            />
          </HEADER_COLUMN>
          <HEADER_COLUMN>
            {checkPassword ? (
              <BUTTOIN onClick={onUpdateSubmit}>수정</BUTTOIN>
            ) : (
              <DARK_BUTTON
                onMouseEnter={hoverHandler}
                onMouseLeave={outHandler}
              >
                불가
              </DARK_BUTTON>
            )}
            <BUTTOIN
              as={Link}
              to={"/"}
              checkProfile={(checkProfile.state = false)}
            >
              취소
            </BUTTOIN>
          </HEADER_COLUMN>
          {hover ? <RED_COLUMN>비밀번호를 확인해주세요 </RED_COLUMN> : <></>}{" "}
          <HEADER_COLUMN>
            <h3>
              새 비밀번호와 비밀번호 재확인을 입력하지 않으시면 기존 비밀번호
              그대로 설정됩니다.
            </h3>
          </HEADER_COLUMN>
        </form>
      ) : (
        <>
          <CENTER_COLUMN></CENTER_COLUMN>
          <HEADER_COLUMN>
            <BUTTOIN
              as={Link}
              to={"/"}
              checkProfile={(checkProfile.state = false)}
            >
              뒤로
            </BUTTOIN>{" "}
          </HEADER_COLUMN>
        </>
      )}
    </>
  );
};

export default withRouter(Profile);
