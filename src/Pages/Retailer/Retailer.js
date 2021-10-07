import axios from "axios";
import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import IntroWord from "../../components/IntroWord";
import Question from "../../components/Question";

const Background = styled.div`
  background-color: #c8d7f3;
  box-sizing: border-box;
  position: absolute;
  padding: 0em;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  font-family: "jf";
`;
const Word = styled.div`
  position: static;
  width: 1000px;
  height: 100px;
  margin-top: 20%;
  margin-left: 40%;
  text-align: left;
  font-size: 50px;
  font-family: "jf";
  font-weight: bold;
  // border: 2px solid black;
  color: black;
`;

export default function Retailer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  let history = useHistory();
  function nextPage() {
    setShowIntro(false);
    setCheck(false);
  }

  return (
    <Background>
      {showIntro ? <IntroWord /> : <Question Role={"retailer"} />}
      {check ? (
        <Button
          style={{
            position: "static",
            marginLeft: "80%",
            marginTop: "5%",
            fontWeight: "400",
          }}
          variant="outline-dark"
          onClick={() => nextPage()}
          show={check}
        >
          {" "}
          點擊下一步
        </Button>
      ) : null}
    </Background>
  );
}
