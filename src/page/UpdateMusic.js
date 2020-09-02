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

const UpdateMusic = () => {
  const [updateFile, setUpdateFile] = useState(musicHandler.state.file);
  const [updateInfo, setUpdateInfo] = useState({
    artist: musicHandler.state.artist,
    name: musicHandler.state.name,
    album: musicHandler.state.album,
  });
  const fileInput = useRef();

  const artist = useInput();
  const album = useInput();
  const name = useInput();

  let bodyFormData = new FormData();

  const onInfoSumbit = (e) => {
    e.preventDefault();

    axios
      .request({
        url: `/renewal/${musicHandler.state.id}`,
        method: "post",
        baseURL: "http://localhost:4000/",
        data: {
          artist: artist.value,
          name: name.value,
          album: album.value,
        },
      })
      .then((res) => {
        if (res.status !== 200) {
          alert("정보 변경 실패.");
        } else {
          setUpdateInfo(res.data);
          alert("정보 변경 완료");
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
        baseURL: "http://localhost:4000/",
        headers: { "Content-Type": "multipart/form-data" },
        data: bodyFormData,
      })
      .then((res) => {
        if (res.status !== 200) {
          alert("파일 변경 실패.");
        } else {
          console.log(res);
          console.log(res.data.file);
          setUpdateFile(res.data.file);
          alert("파일 변경 완료");
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
