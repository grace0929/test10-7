import axios from "axios";
import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { keyframes } from "styled-components";

//radio 單選按鈕 import
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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

const Block = styled.div`
  position: static;
  padding: 30px;
  width: 500px;
  height: 480px;
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

export default function Question({ Role }) {
  const [value1, setValue1] = useState("yes");
  const [value2, setValue2] = useState("yes");
  const [value3, setValue3] = useState("yes");
  let history = useHistory();
  //問題字體格式
  let style = {
    position: "static",
    fontSize: "20px",
    fontFamily: "jf",
    fontWeight: "bold",
  };
  //下一步btn
  let btnstyle = {
    position: "static",
    marginLeft: "80%",
    marginTop: "10%",
    fontWeight: "400",
  };
  const handleChange1 = (event) => {
    setValue1(event.target.value);
  };
  const handleChange2 = (event) => {
    setValue2(event.target.value);
  };
  const handleChange3 = (event) => {
    setValue3(event.target.value);
  };
  //送出 使用者選擇的屬性問題
  function handleClick() {
    // axios
    //   .post("", {
    //     values: [value1, value2, value3],
    //   })
    //   .then((res) => {
    //     if (res.data) {
    //     } else alert("回傳錯誤");
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    if (window.location.pathname === "/supplier") {
      history.push("/basicinfosupplier");
    } else {
      history.push("/basicinfo");
    }
  }

  return (
    <Block>
      <FormControl component="fieldset">
        <FormLabel component="legend" style={style}>
          問題一：你喜歡謹慎選擇勝過一時衝動？
        </FormLabel>
        <RadioGroup
          aria-label="chioce"
          name="chioce1"
          value={value1}
          onChange={handleChange1}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
        <FormLabel component="legend" style={style}>
          問題二：與想像的事物相比，你對已存在的事物比較有興趣？
        </FormLabel>
        <RadioGroup
          aria-label="chioce"
          name="chioce2"
          value={value2}
          onChange={handleChange2}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
        <FormLabel component="legend" style={style}>
          問題三：在做事時你通常根據一般的方法進行，而非你想要的做法？
        </FormLabel>
        <RadioGroup
          aria-label="chioce"
          name="chioce3"
          value={value3}
          onChange={handleChange3}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
        <Button
          variant="outline-secondary"
          style={btnstyle}
          onClick={handleClick}
        >
          {" "}
          下一步
        </Button>
      </FormControl>
    </Block>
  );
}
