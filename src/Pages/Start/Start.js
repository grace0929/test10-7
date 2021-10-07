import axios from "axios";
import React, { useState, useEffect } from "react";
import logo from "../../assets/ssm.png";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Radium from "radium";
import { disconnectSocket } from '../../socket';

const Background = styled.div`
  background-color: #b9d8da;
  box-sizing: border-box;
  position: absolute;
  padding: 0em;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
`;

const Logo = styled.div`
  position: static;
  width: 100px;
  height: 100px;
  margin-top: 10%;
  margin-left: 10%;
  text-align: center;
  background-image: url("../../assets/ssm.png");
`;
const Welcome = styled.div`
  position: static;
  width: 400px;
  height: 100px;
  margin-top: 5%;
  margin-left: 10%;
  text-align: left;
  font-size: 50px;
  font-family: "jf";
  font-weight: bold;
  // border: 2px solid black;
`;
const SCF = styled.div`
  position: static;
  width: 1000px;
  height: 100px;
  margin-top: 1%;
  margin-left: 10%;
  text-align: left;
  font-size: 50px;
  font-family: "jf";
  font-weight: bold;
  // border: 2px solid black;
  color: #ee786c;
`;
const StartBtn = styled.div`
  position: static;
  width: 100px;
  height: 100px;
  margin-top: 5%;
  margin-left: 45%;
  text-align: left;
  font-size: 50px;
  font-family: "Comic Sans MS";
  color: #ee786c;
`;

export default function Start() {
  let history = useHistory();
  const pushtologin = () => {
    history.push("/login")
  }
  useEffect(() => {
    disconnectSocket()
  }, [])

  return (
    <Background>
      <Logo>
        <img
          src={logo}
          alt="Background"
          style={{
            width: "10rem",
            margin: "0.1vw",
            borderRadius: "30px",
          }}
        />
      </Logo>
      <Welcome>Welcome</Welcome>
      <SCF>Supply Chain Financing</SCF>
      <StartBtn>
        <Button
          style={{
            fontWeight: "900",
            width: "10rem",
            margin: "0.1vw",
            borderRadius: "30px",
            color: "#ee786c",
            backgroundColor: "#fff",
            transition: "all ease .5s",
            ":hover": {
              backgroundColor: "#ee786c",
              color: "#ffffff",
            },
          }}
          onClick={pushtologin}
          // href="/login"
          variant="outline-light"
        >
          Start
        </Button>
      </StartBtn>
    </Background>
  );
}
