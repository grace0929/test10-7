import axios from "axios";
import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const Word = styled.div`
  position: static;
  width: 1000px;
  height: 200px;
  margin-top: 20%;
  margin-left: 40%;
  text-align: left;
  font-size: 50px;
  font-family: "jf";
  font-weight: bold;
  // border: 2px solid black;
  color: black;
`;

export default function Explanation({}) {
  let history = useHistory();

  return (
    <Word>
      遊戲開始之前，
      <br />
      想先問幾個問題...{" "}
    </Word>
  );
}
