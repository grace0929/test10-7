import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import SyncLoader from "react-spinners/SyncLoader";
import { Tick } from "react-crude-animated-tick";
import SendIcon from "@material-ui/icons/Send";
import { css } from "@emotion/react";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import { setDisabled, setMerchandise } from "../../redux/processSlice";
import { setCash } from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { RefreshAuthLogic } from "../../refreshAuthLogic";
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import gif from "../../assets/sellProducts.gif"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #f29979;
  margin-top: 20%;
`;

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
  font-size: 40px;
  font-family: "jf";
  font-weight: bold;
  text-align: center;
  //border: 2px solid black;
  color: black;
`;
const Content = styled.div`
  position: static;
  display: flex;
  max-height: 30vh;
  margin-top: 3%;
  margin-left: 2%;
  font-size: 20px;
  font-family: "jf";
  font-weight: bold;
  text-align: center;
  justify-content: center;
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

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(2),
      fontFamily: "jf",
    },
  },
  input: {
    borderRadius: 10,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #adceed",
    fontFamily: "jf",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["jf"].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#f29979",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      fontFamily: "jf",
    },
  },
}))(InputBase);
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    fontFamily: "jf",
    fontWeight: "500",
    marginLeft: "42%",
  },
}));
export default function Merchandise(props) {
  // const [check, setCheck] = useState(false);
  // const [matchStatus, setMatchStatus] = useState(false);
  const dispatch = useDispatch()
  const { merchandise } = useSelector(state => state.process)
  const classes = useStyles()
  const { accessToken } = useSelector(state => state.accessToken)
  const { user: { userId } } = useSelector(state => state.user)
  const { pair: { createdAt } } = useSelector(state => state.game)
  //auto handle request when accessToken was expired
  const instance = axios.create({
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  //auto handle request when accessToken was expired
  const refreshAuthLogic = RefreshAuthLogic()
  createAuthRefreshInterceptor(instance, refreshAuthLogic)
  //判斷step
  if (props.currentStep !== 3) {
    return null;
  }
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

  //販賣商品
  function handleClick() {
    instance
      .patch("http://localhost:3300/flows/cash", {
        userId,
        type: "sellproduct",
        cash: 3000,
        pairCreatedAt: createdAt
      })
      .then((res) => {
        console.log(res.status)
        //要根據供需表決定賣出的商品價格
        if (res.status == 200) {
          dispatch(setCash(3000))
          dispatch(setMerchandise(true))
          dispatch(setDisabled(false))
          alert("賣出商品!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
  //從等供應商定價畫面 => 議價表單出來
  //如果有match成功 則換成Tick畫面
  function renderSwitch(param) {
    switch (param) {
      case false:
        return (
          <Content>
            <img
              src={gif}
              alt=""
              style={{
                borderRadius: "15px",
                maxHeight: "100vh",
                minWidth: "20vw",
              }}
            />
          </Content>
        );
      default:
        return <></>;
    }
  }

  return (
    <>
      <Block>
        <Word>
          {merchandise ? "完成販賣!" : "販賣產品中..."}
          {merchandise ? (
            ""
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="sl"
              className={classes.button}
              style={{}}
              endIcon={<SendIcon />}
              onClick={handleClick}
            >
              完成販賣
            </Button>
          )}
        </Word>

        {renderSwitch(merchandise)}
      </Block>
    </>
  );
}
