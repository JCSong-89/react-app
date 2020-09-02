import axios from "axios";
import React, { useState, useRef } from "react";
import {
  CENTER_COLUMN,
  HEADER_COLUMN,
  INPUT,
  BUTTOIN,
} from "../../styles/index";
import useInput from "../../Hooks/useInput";
import { Link, withRouter } from "react-router-dom";
import { checknewMusic } from "../../redux/Home.readux";

const Uploader = (newMusic) => {
  const [completed, setCompleted] = useState(true);
  const artist = useInput();
  const album = useInput();
  const name = useInput();
  const fileInput = useRef();
  const data = {
    username: newMusic.newMusic.data.username,
    id: newMusic.newMusic.data.userId,
  };

  let bodyFormData = new FormData();

  const onSumbit = (e) => {
    e.preventDefault();
    console.log(fileInput.current.files[0]);
    console.log(artist.value);
    console.log(album.value);
    console.log(name.value);
    console.log(data.username);
    console.log(data.id);

    bodyFormData.append("music", fileInput.current.files[0]);
    bodyFormData.append("artist", artist.value);
    bodyFormData.append("album", album.value);
    bodyFormData.append("name", name.value);
    bodyFormData.append("username", data.username);
    bodyFormData.append("userId", data.id);
    console.log(bodyFormData);
    axios
      .request({
        url: `uploading/${data.username}/${data.id}`,
        method: "post",
        baseURL: "http://localhost:4000/",
        headers: { "Content-Type": "multipart/form-data" },
        data: bodyFormData,
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

  return (
    <>
      <CENTER_COLUMN />
      {completed ? (
        <form>
          <HEADER_COLUMN>
            <h3>가수 이름</h3>
            <INPUT {...artist} />
          </HEADER_COLUMN>
          <HEADER_COLUMN>
            <h3>앨범명</h3>
            <INPUT {...album} />
          </HEADER_COLUMN>
          <HEADER_COLUMN>
            <h3>노래 제목</h3>
            <INPUT {...name} />
          </HEADER_COLUMN>
          <HEADER_COLUMN>
            <input type="file" ref={fileInput} />
            <BUTTOIN onClick={onSumbit}>올리기</BUTTOIN>
          </HEADER_COLUMN>
        </form>
      ) : (
        <BUTTOIN
          as={Link}
          to={"/"}
          checknewMusic={(checknewMusic.state = false)}
        >
          홈으로
        </BUTTOIN>
      )}
    </>
  );
};

export default withRouter(Uploader);
