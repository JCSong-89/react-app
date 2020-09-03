//Module
import axios from "axios";
import React, { useRef, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Link, withRouter } from "react-router-dom";
import { checkSearch, musicHandler } from "../redux/Home.readux";

//MiddleWare
import useInput from "../Hooks/useInput";

// Styled-Component
import { INPUT, BUTTOIN, HEADER_COLUMN } from "../styles/index";

const UpdateMusic = ({ music }) => {
  const [updateFile, setUpdateFile] = useState(music.file);
  const [updateInfo, setUpdateInfo] = useState({
    artist: music.artist,
    name: music.name,
    album: music.album,
  });
  const fileInput = useRef();
  const artist = useInput(updateInfo.artist);
  const album = useInput(updateInfo.album);
  const name = useInput(updateInfo.name);

  let bodyFormData = new FormData();

  // Handler
  const onInfoSumbit = (e) => {
    e.preventDefault();

    axios
      .request({
        url: `/renewal/${musicHandler.state.id}`,
        method: "post",
        baseURL:
          "http://ec2-52-78-177-57.ap-northeast-2.compute.amazonaws.com:8000",
        data: {
          artist: artist.value,
          name: name.value,
          album: album.value,
        },
        headers: { Authentication: localStorage.getItem("Authentication") },
      })
      .then((res) => {
        if (res.status === 400) {
          alert("정보 변경 실패.");
        }
        if (res.status === 200) {
          setUpdateInfo(res.data);
          alert("정보 변경 완료");
        }
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 401") {
          alert("해당 등록자가 아닙니다.");
        } else {
          alert("에러 발생");
        }
      });
  };

  const onFileSumbit = (e) => {
    e.preventDefault();
    bodyFormData.append("music", fileInput.current.files[0]);
    axios
      .request({
        url: `/uploading/${musicHandler.state.id}`,
        method: "post",
        baseURL:
          "http://ec2-52-78-177-57.ap-northeast-2.compute.amazonaws.com:8000",
        headers: {
          "Content-Type": "multipart/form-data",
          Authentication: localStorage.getItem("Authentication"),
        },
        data: bodyFormData,
      })
      .then((res) => {
        if (res.status === 400) {
          alert("정보 변경 실패.");
        } else if (res.status === 200) {
          setUpdateFile(res.data.file);
          alert("파일 변경 완료");
        }
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 401") {
          alert("해당 등록자가 아닙니다.");
        } else {
          alert("에러 발생");
        }
      });
  };

  return (
    <>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>가수명</TableCell>
              <TableCell>노래</TableCell>
              <TableCell>앨범</TableCell>
              <></>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{updateInfo.artist}</TableCell>
              <TableCell>{updateInfo.name}</TableCell>
              <TableCell>{updateInfo.album}</TableCell>
              <></>
            </TableRow>
            <TableRow>
              <TableCell>
                <INPUT {...artist} />
              </TableCell>
              <TableCell>
                <INPUT {...name} />
              </TableCell>
              <TableCell>
                <INPUT {...album} />
              </TableCell>
              <BUTTOIN onClick={onInfoSumbit}>내용수정</BUTTOIN>
            </TableRow>
            <TableRow>
              <TableCell>현재파일명:</TableCell>
              <TableCell>{updateFile}</TableCell>
              <TableCell>
                <input type="file" ref={fileInput} />
              </TableCell>
              <BUTTOIN onClick={onFileSumbit}>파일변경</BUTTOIN>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <HEADER_COLUMN>
        <BUTTOIN as={Link} to={"/"} checkSearch={(checkSearch.state = false)}>
          HOME
        </BUTTOIN>
      </HEADER_COLUMN>
    </>
  );
};

export default withRouter(UpdateMusic);
