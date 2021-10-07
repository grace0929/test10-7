import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Alert from "react-bootstrap/Alert";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
const Block = styled.div`
  position: static;
  padding: 30px;
  width: 50vw;
  height: 50vh;
  margin-top: 2vh;
  margin-left: 2vw;
  text-align: left;
  font-size: 50px;
  font-family: "jf";
  font-weight: bold;
  background-color: #ffffffd5;
  border: 8px solid #adceed;
  border-radius: 10px;
  color: black;
`;
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
  margin-top: 3%;
  margin-left: 2%;
  font-size: 20px;
  font-family: "jf";
  font-weight: bold;
  text-align: center;
  //border: 2px solid black;
  color: black;
`;
const ContentWord = styled.div`
  position: static;
  width: 180px;
  margin-right: 5%;
  font-size: 30px;
  font-family: "jf";
  font-weight: bold;
  text-align: center;
  //border: 2px solid black;
  color: black;
`;
const ContentFooter = styled.div`
  position: static;
  display: flex;
  align-items: center;
  margin-top: 10%;
  font-size: 20px;
  font-family: "jf";
  font-weight: bold;
  text-align: center;
  //border: 2px solid black;
  color: black;
`;

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    fontFamily: "jf",
    fontWeight: "500",
    marginLeft: "42%",
  },
}));
export default function Repayment() {
  const [money, setMoney] = useState(0);
  const [check, setCheck] = useState(false);
  const classes = useStyles();
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
  //click 還款 axios
  function handleClick() {
    if (check === false) {
      setCheck(true);
    } else {
      setCheck(false);
    }
    // api
    // axios
    //   .post("")
    //   .then(async (res) => {
    //     if (res.status === 200) {
    //       if (check === false) {
    //         setCheck(true);
    //       } else {
    //         setCheck(false);
    //       }
    //     } else {
    //       alert("error");
    //     }
    //   })
    //   .catch((err) => {});
  }
  return (
    <>
      <Block>
        <Word>借貸還款</Word>
        <Content>
          <ContentWord>金額</ContentWord>
          <ContentWord style={{ color: "#757ce8" }}>{money}</ContentWord>
          {/* </Content> */}
        </Content>
        <Content style={{ width: "40vw", height: "70px", marginLeft: "9%" }}>
          <Alert variant="success" show={check}>
            還款成功！
          </Alert>
        </Content>
        <ContentFooter style={{}}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            endIcon={<SendIcon />}
            onClick={handleClick}
          >
            進行還款
          </Button>
        </ContentFooter>
      </Block>
    </>
  );
}
