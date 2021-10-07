import { useTheme } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setPair } from "../../redux/gameSlice";
import { setPaired, setFlow } from "../../redux/userSlice";
import { RefreshAuthLogic } from "../../refreshAuthLogic";
import createAuthRefreshInterceptor from 'axios-auth-refresh';
//loader
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";
import { Tick } from "react-crude-animated-tick";
//loader css
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #f29979;
  margin-top: 20%;
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
  margin-top: 5%;
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

export default function Match({ }) {
  let [matchStatus, setMatchStatus] = useState(false);
  let [matchText, setMatchText] = useState(
    matchStatus ? "匹配完成" : "匹配中..."
  );
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#f29979");
  let history = useHistory();
  let btnstyle = {
    position: "static",
    marginLeft: "80%",
    marginTop: "1%",
    fontWeight: "400",
    borderRadius: "10px",
  };
  const [socket, setSocket] = useState()
  const { user: { paired, role, userId, classroomId } } = useSelector(state => state.user)
  const { accessToken } = useSelector(state => state.accessToken)
  const { pair: { pairId } } = useSelector(state => state.game)
  const dispatch = useDispatch()
  const instance = axios.create({
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  //auto handle request when accessToken was expired
  const refreshAuthLogic = RefreshAuthLogic()
  createAuthRefreshInterceptor(instance, refreshAuthLogic)
  // useEffect(async () => {
  //   instance
  //     .get("http://localhost:3300/users/me", {
  //     })
  //     .then(res => {
  //       if (res.data.user.paired) {
  //         dispatch(setPaired(res.data.user.paired))
  //         dispatch(setPair(pair))
  //         setLoading(false)
  //         setMatchStatus(true)
  //       }
  //       dispatch(setFlow(res.data))
  //       history.push("/bargainfirstretailer")
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     });
  // }, [])
  useEffect(() => {
    const s = io("http://localhost:3300")
    setSocket(s)
    console.log(s)
    if (!pairId) {
      s.emit("match", userId, role, classroomId)
      s.once("match-success", (pair) => {
        dispatch(setPaired(pair.supplierId))
        dispatch(setPair(pair))
        setLoading(false)
        setMatchStatus(true)
      })
    } else {
      setLoading(false)
      setMatchStatus(true)
    }
    return () => {
      s.disconnect()
    }
  }, [])
  useEffect(() => {
    renderSwitch(loading);
  }, [loading, matchStatus]);

  // handle 下一步 Btn
  const handleClick = async () => {
    instance
      .post("http://localhost:3300/flows", {
        userId: userId,
        creditRating: "低",
        cash: 100000,
        inventory: 100,
        liability: 0
      })
      .then(res => {
        dispatch(setFlow(res.data.flow))
        history.push("/bargainfirstretailer")
      })
      .catch((err) => {
        console.log(err)
      });
  }

  //如果有match成功 則換成Tick畫面
  function renderSwitch(param) {
    switch (param) {
      case true:
        return (
          <Content>
            <SyncLoader
              color={color}
              loading={loading}
              css={override}
              size={20}
              speedMultiplier={0.5}
            />
          </Content>
        );
      case false:
        return (
          <>
            <Content>
              <Tick size={200} style={{ border: "2px solid black" }} />
            </Content>
            <Content>
              <Button
                variant="outline-secondary"
                style={btnstyle}
                onClick={handleClick}
              >
                {" "}
                下一步
              </Button>
            </Content>
          </>
        );
      default:
        return "foo";
    }
  }

  return (
    <>
      <Block>
        {" "}
        <Word>{matchStatus ? "匹配完成" : "匹配中..."}</Word>
        {renderSwitch(loading)}
      </Block>
    </>
  );
}
