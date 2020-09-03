//Module
import axios from "axios";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

//MiddleWare
import useInput from "../Hooks/useInput";
import {
  checkSearch,
  checkProfile,
  checknewMusic,
  checkMusic,
  musicHandler,
} from "../redux/Home.readux";

// Componenet
import { UPLOADER, PROFILE, MUSIC_LIST } from "../components/index";

// Styled-Component
import {
  HEADER,
  HEADER_COLUMN,
  HEADER_LINK,
  HEADER_WRAPPER,
  SEARCH_INPUT,
  BUTTOIN,
  CENTER_COLUMN,
} from "../styles/index";

const Home = () => {
  const [searchList, setSearchList] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [newMusic, setNewMusic] = useState({});
  const [message, setMessage] = useState("원하시는 곡명을 검색하세요.");
  const search = useInput("");
  const [isLoading, setIsLoading] = useState(false);

  //state
  let checkSearchValue = checkSearch.state;
  let checkProfileValue = checkProfile.state;
  let checkNewMusicValue = checknewMusic.state;
  let checkMusicValue = checkMusic.state;

  //Handler
  const onSearchSubmit = (e) => {
    e.preventDefault();
    checkSearch.state = false;
    checkProfile.state = false;
    checknewMusic.state = false;
    checkMusic.state = false;
    setIsLoading(true);
    const qeury = `/search?music=${search.value}`;
    axios
      .get(
        `http://ec2-52-78-177-57.ap-northeast-2.compute.amazonaws.com:8000/${qeury}`
      )
      .then((res) => {
        if (res.data.message) {
          setMessage(res.data.message);
          setIsLoading(false);
        } else {
          setSearchList(res.data);
          checkSearch.state = true;
          setIsLoading(false);
        }
      });
  };

  const onProfileSubmit = (e) => {
    e.preventDefault();
    checkSearch.state = false;
    checkProfile.state = false;
    checknewMusic.state = false;
    checkMusic.state = false;
    setIsLoading(true);
    axios
      .request({
        url: "/profile",
        method: "get",
        baseURL:
          "http://ec2-52-78-177-57.ap-northeast-2.compute.amazonaws.com:8000/",
        headers: { Authentication: localStorage.getItem("Authentication") },
      })
      .then((res) => {
        if (res.data.message) {
          setMessage(res.data.message);
          setIsLoading(false);
        } else {
          setUserProfile(res);
          checkProfile.state = true;
          setIsLoading(false);
        }
      });
  };

  const onUploadSubmit = (e) => {
    e.preventDefault();
    checkSearch.state = false;
    checkProfile.state = false;
    checknewMusic.state = false;
    checkMusic.state = false;
    setIsLoading(true);
    axios
      .request({
        url: "/uploading",
        method: "post",
        baseURL:
          "hhttp://ec2-52-78-177-57.ap-northeast-2.compute.amazonaws.com:8000/",
        headers: { Authentication: localStorage.getItem("Authentication") },
      })
      .then((res) => {
        if (res.data.message) {
          setMessage(res.data.message);
          setIsLoading(false);
        } else {
          setNewMusic(res);
          checknewMusic.state = true;
          setIsLoading(false);
        }
      });
  };

  const loginOutHandler = () => {
    checkSearch.state = false;
    checkProfile.state = false;
    checknewMusic.state = false;
    checkMusic.state = false;
    localStorage.clear();
  };

  useEffect(() => {}, [message]);
  useEffect(() => {}, [searchList]);
  useEffect(() => {}, [userProfile]);

  return (
    <>
      <HEADER>
        <HEADER_WRAPPER>
          <HEADER_LINK onClick={onUploadSubmit}>음악등록</HEADER_LINK>
          <HEADER_COLUMN>
            <form onSubmit={onSearchSubmit}>
              <SEARCH_INPUT {...search} placeholder="Search" />
              <BUTTOIN>검색</BUTTOIN>
            </form>
          </HEADER_COLUMN>
          <HEADER_LINK onClick={onProfileSubmit}>프로필</HEADER_LINK>
          <HEADER_LINK as={Link} to={"/login"} onClick={loginOutHandler}>
            로그아웃
          </HEADER_LINK>
        </HEADER_WRAPPER>
      </HEADER>
      {!checkSearchValue &&
        !checkProfileValue &&
        !checkNewMusicValue &&
        !checkMusicValue &&
        !isLoading && (
          <>
            <CENTER_COLUMN> {message} </CENTER_COLUMN>
          </>
        )}
      {isLoading && (
        <>
          <CENTER_COLUMN> 불러오는 중 </CENTER_COLUMN>
        </>
      )}
      {checkSearchValue && !isLoading && (
        <>
          <HEADER_COLUMN></HEADER_COLUMN>
          <HEADER_COLUMN></HEADER_COLUMN>
          <MUSIC_LIST data={searchList} />
        </>
      )}
      {checkProfileValue && !isLoading && (
        <>
          <PROFILE userProfile={userProfile} state={checkProfile.state} />
        </>
      )}
      {checkNewMusicValue && !isLoading && (
        <>
          <UPLOADER newMusic={newMusic} />
        </>
      )}
    </>
  );
};

export default withRouter(
  connect(
    (state) => ({
      state,
    }),
    (dispatch) => ({
      checkSearch: () => dispatch(checkSearch()),
      checknewMusic: () => dispatch(checknewMusic()),
      checkMusic: () => dispatch(checkMusic()),
      checkProfile: () => dispatch(checkProfile()),
      musicHandler: () => dispatch(musicHandler()),
    })
  )(Home)
);
