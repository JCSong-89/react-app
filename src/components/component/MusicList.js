//Module
import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

//MiddleWare
import { musicHandler } from "../../redux/Home.readux";

// Styled-Component
import { BUTTOIN } from "../../styles/index";

const MusicList = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);
  musicHandler.state = data;
  const openModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>가수명</TableCell>
            <TableCell>노래</TableCell>
            <TableCell>앨범</TableCell>
            <TableCell>등록자</TableCell>
            <TableCell>등록일</TableCell>
            <TableCell>
              <BUTTOIN onClick={openModal}>상세조회</BUTTOIN>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((music) => (
            <TableRow>
              <TableCell>{music.id}</TableCell>
              <TableCell>{music.artist}</TableCell>
              <TableCell>{music.name}</TableCell>
              <TableCell>{music.album}</TableCell>
              <TableCell>{music.username}</TableCell>
              <TableCell>{music.createdAt}</TableCell>
              {modalVisible && (
                <TableCell>
                  <div>등록ID: {music.id}</div>
                  <div>등록자: {music.username}</div>
                  <div>파일명: {music.file}</div>
                  <div>파일크기: {music.size}MB</div>
                  <div>노래제목: {music.name}</div>
                  <div>앨범명: {music.album}</div>
                  <div>가수: {music.artist}</div>
                </TableCell>
              )}
              <BUTTOIN
                as={Link}
                to={`/uploading/${music.id}`}
                musicHandler={musicHandler.state}
              >
                수정
              </BUTTOIN>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default withRouter(MusicList);
