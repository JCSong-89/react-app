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

// Componenet
import { MODAL } from "../index";

// Styled-Component
import { BUTTOIN, HEADER_COLUMN } from "../../styles/index";

const MusicList = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
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
            <TableCell></TableCell>
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
              <BUTTOIN onClick={openModal}>조회</BUTTOIN>
              <BUTTOIN
                as={Link}
                to={"/uploading"}
                musicHandler={(musicHandler.state = music)}
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
