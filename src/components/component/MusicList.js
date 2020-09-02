import { HashRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { BUTTOIN, HEADER_COLUMN } from "../../styles/index";
import { MODAL } from "../index";
import { Link, withRouter } from "react-router-dom";
import { musicHandler } from "../../redux/Home.readux";

const MusicList = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  console.log(data);
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
              <BUTTOIN onClick={openModal}>조회</BUTTOIN>
              {modalVisible && (
                <MODAL
                  visible={modalVisible}
                  closable={true}
                  maskClosable={true}
                  onClose={closeModal}
                >
                  <HEADER_COLUMN>등록ID: {music.id}</HEADER_COLUMN>
                  <HEADER_COLUMN>등록자: {music.username}</HEADER_COLUMN>
                  <HEADER_COLUMN>파일명: {music.file}</HEADER_COLUMN>
                  <HEADER_COLUMN>파일크기: {music.size}MB</HEADER_COLUMN>
                  <HEADER_COLUMN>노래제목: {music.name}</HEADER_COLUMN>
                  <HEADER_COLUMN>앨범명: {music.album}</HEADER_COLUMN>
                  <HEADER_COLUMN>가수: {music.artist}</HEADER_COLUMN>
                </MODAL>
              )}
              <BUTTOIN
                as={Link}
                to={"/update"}
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
