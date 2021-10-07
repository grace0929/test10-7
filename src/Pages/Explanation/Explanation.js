import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
//youtube embedded
import YouTube from "react-youtube";

const Word = styled.div`
  position: static;
  font-size: 50px;
  font-family: "jf";
  font-weight: bold;
  text-align: center;
  //border: 2px solid black;
  color: black;
`;
const Content = styled.div`
  position: static;
  display: flex;
  margin-top: 10%;
  font-size: 20px;
  font-family: "jf";
  font-weight: bold;
  text-align: left;
  //border: 2px solid black;
  color: black;
`;
const ContentWord = styled.div`
  position: static;
  width: 180px;
  margin-top: 5%;
  margin-right: 5%;
  font-size: 20px;
  font-family: "jf";
  font-weight: bold;
  text-align: left;
  //border: 2px solid black;
  color: black;
`;

const Block = styled.div`
  position: static;
  padding: 30px;
  width: 500px;
  height: 650px;
  margin-top: 10%;
  margin-left: 40%;
  text-align: left;
  font-size: 50px;
  font-family: "jf";
  font-weight: bold;
  background-color: #ffffffd5;
  border: 8px solid #f29979;
  border-radius: 30px;
  color: black;
`;

const BeautifulButton = styled.button`
position: static;
margin: 10px 10px 10px 330px;
color: #494949;
width:80px;
height: 40px;
text-transform: uppercase;
background: #ffffff;
padding: 5px;
font-size: 15px;
border: 1px solid #494949;
border-radius: 10px;
display: inline-block;
  border-radius: 30px,
  transition: all 0.2s ease 0s;
  &:hover {
    color: #ffffff;
    background: #f29979;
    border-color: #f29979;
    transition: all 0.2s ease 0s;
  }
`;

export default function Explanation({ }) {
  let history = useHistory();
  let btnstyle = {
    position: "static",
    marginLeft: "80%",
    marginTop: "1%",
    fontWeight: "400",
    borderRadius: "10px",
  };
  const opts = {
    position: "static",
    marginTop: "5%",
    height: "250",
    width: "400",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const pushtomatch = () => {
    history.push("/match")
  }

  return (
    <>
      <Block>
        <Word>遊戲說明</Word>
        <Content>
          <ContentWord>內容再議....</ContentWord>
        </Content>
        <ContentWord>示範影片</ContentWord>
        <Content>
          <YouTube videoId="XM52n0oaPSM" opts={opts} />
        </Content>
        <Button variant="outline-secondary" style={btnstyle} onClick={pushtomatch}>
          {" "}
          下一步
        </Button>
      </Block>
    </>
  );
}
