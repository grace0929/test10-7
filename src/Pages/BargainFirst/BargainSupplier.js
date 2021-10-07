import axios from "axios";
import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "@material-ui/core/Button";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import SendIcon from "@material-ui/icons/Send";
import { css } from "@emotion/react";

import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setInvoice } from "../../redux/invoiceSlice";
import Loading from "../../components/Loading";

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
  margin-top: 1vh;
  font-family: "jf";
  font-weight: bold;
  text-align: left;
  //border: 2px solid black;
  color: black;
`;
const ContentWord = styled.div`
  position: static;
  width: 180px;
  margin-top: 3%;
  margin-right: 5%;
  font-size: 30px;
  font-family: "jf";
  font-weight: bold;
  text-align: left;
  //border: 2px solid black;
  color: black;
`;

const Block = styled.div`
  position: static;
  padding: 30px;
  width: 700px;
  height: 700px;
  margin-top: 10%;
  margin-left: 30vw;
  text-align: left;
  font-size: 50px;
  font-family: "jf";
  font-weight: bold;
  background-color: #ffffffd5;
  border: 8px solid #f29979;
  border-radius: 30px;
  color: black;
`;
const ContentFooter = styled.div`
  position: static;
  display: flex;
  align-items: center;

  font-size: 20px;
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

export default function BargainFirstSupplier({ }) {
  const [socket, setSocket] = useState()
  const [money, setMoney] = useState()
  const [creditTerm, setCreditTerm] = useState(0)
  //const [creditLine, setCreditLine] = useState(0)
  const [amount, setAmount] = useState(0)
  const [status, setStatus] = useState("true")
  const [isFocused, setIsFocused] = useState(false)
  const { user: { userId } } = useSelector(state => state.user)
  const { pair: { pairId } } = useSelector(state => state.game)
  const { invoice } = useSelector(state => state.invoice)
  const classes = useStyles()
  const dispatch = useDispatch()
  let history = useHistory()

  const handleFocus = () => {
    setIsFocused(true);
  };
  useEffect(() => {
    const s = io("http://localhost:3300")
    setSocket(s)
    console.log(s)
    s.emit("join", pairId)
    return () => {
      s.disconnect()
    }
  }, [])
  useEffect(() => {
    if (socket == null) return
    socket.on("invoice-supplier", (invoice) => {
      console.log(invoice)
      setAmount(invoice.amount)
      dispatch(setInvoice(invoice))
      setStatus("final")
    })
  }, [socket])
  function tempSubmit(e) {
    e.preventDefault()
    setStatus("false")
    socket.emit("sendInvoiceSupplier", { price: money, creditTerm }, pairId)
  }
  function handleIntoAdmin() {
    history.push("/supplieradmin");
  }

  function validateForm() {
    return money != "" && creditTerm != "";
  }

  //從等供應商定價畫面 => 議價表單出來
  //如果有match成功 則換成Tick畫面
  function renderSwitch(param) {
    switch (param) {
      case "true":
        return (
          <>
            <Word>議價</Word>
            <Form onSubmit={tempSubmit}>
              <Content>
                <ContentWord>價格(單價)</ContentWord>
                <ContentWord style={{ color: "#757ce8" }}>
                  <BootstrapInput
                    id="demo-customized-textbox"
                    value={money}
                    style={{ width: "200px" }}
                    onChange={(e) => setMoney(e.target.value)}
                  />
                </ContentWord>
              </Content>
              <Content>
                <ContentWord>Credit Term</ContentWord>
                <ContentWord style={{ color: "#757ce8" }}>
                  <NativeSelect
                    id="demo-customized-select-native"
                    value={creditTerm}
                    onChange={(e) => setCreditTerm(e.target.value)}
                    input={<BootstrapInput />}
                    onFocus={handleFocus}
                    style={{
                      borderBottomColor: isFocused ? "#f29979" : "#f29979",
                      width: "200px",
                    }}
                  >
                    <option aria-label="選擇creditTerm" value="" />
                    <option value={1}>一個月 </option>
                    <option value={2}>二個月</option>
                    <option value={3}>三個月</option>
                  </NativeSelect>
                </ContentWord>
              </Content>
              {/* <Content>
                <ContentWord>Credit Line</ContentWord>
                <ContentWord style={{ color: "#757ce8" }}>
                  <NativeSelect
                    id="demo-customized-select-native"
                    value={creditLine}
                    onChange={(e) => setCreditLine(e.target.value)}
                    input={<BootstrapInput />}
                    onFocus={handleFocus}
                    style={{
                      borderBottomColor: isFocused ? "#f29979" : "#f29979",
                      width: "200px",
                    }}
                  >
                    <option aria-label="選擇creditLine" value="" />
                    <option value={100}>一百萬 </option>
                    <option value={200}>一百二十萬</option>
                    <option value={300}>一百五十萬</option>
                  </NativeSelect>
                </ContentWord>
              </Content> */}
              <ContentFooter style={{}}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                  endIcon={<SendIcon />}
                  onClick={tempSubmit}
                  disabled={!validateForm()}
                >
                  下一步
                </Button>
              </ContentFooter>
            </Form>
          </>
        );
      case "false":
        return (
          <>
            <Word>等待企業傳送契約</Word>
            <Loading />
            {/* <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              endIcon={<SendIcon />}
            >
              下一步
            </Button> */}
          </>
        );
      case "final":
        return (
          <>
            <Word>契約產生</Word>
            <Content>
              <ContentWord>價格/單價</ContentWord>
              <ContentWord style={{ color: "#757ce8" }}>{invoice.unitPrice}</ContentWord>
            </Content>
            <Content>
              <ContentWord>Credit Term</ContentWord>
              <ContentWord style={{ color: "#757ce8" }}>
                {invoice.creditTerms}
              </ContentWord>
            </Content>
            {/* <Content>
              <ContentWord>Credit Line</ContentWord>
              <ContentWord style={{ color: "#757ce8" }}>
                {creditLine}
              </ContentWord>
            </Content> */}
            <Content>
              <ContentWord>數量</ContentWord>
              <ContentWord style={{ color: "#757ce8" }}>{invoice.amount}</ContentWord>
            </Content>
            <Content>
              <ContentWord>交易日</ContentWord>
              <ContentWord style={{ color: "#757ce8" }}>
                {invoice.transactionDate}
              </ContentWord>
            </Content>
            <Content>
              <ContentWord>交貨日</ContentWord>
              <ContentWord style={{ color: "#757ce8" }}>
                {invoice.deliveryDate}
              </ContentWord>
            </Content>
            <Content>
              <ContentWord>交貨款日</ContentWord>
              <ContentWord style={{ color: "#757ce8" }}>
                {invoice.paymentDate}
              </ContentWord>
            </Content>
            <Content>
              <ContentWord>應付款項</ContentWord>
              <ContentWord style={{ color: "#757ce8" }}>
                {invoice.payable}
              </ContentWord>
            </Content>
            <ContentFooter style={{}}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                endIcon={<SendIcon />}
                onClick={handleIntoAdmin}
              >
                進入決策中心
              </Button>
            </ContentFooter>
          </>
        );
      default:
        return <></>;
    }
  }

  return (
    <>
      <Block>{renderSwitch(status)}</Block>
    </>
  );
}
