import axios from "axios";
import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "@material-ui/core/Button";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import SendIcon from "@material-ui/icons/Send";
import { css } from "@emotion/react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { RefreshAuthLogic } from "../../refreshAuthLogic";
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { setInvoice } from "../../redux/invoiceSlice";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

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

export default function BargainFirst_retailer({ }) {
  const { accessToken } = useSelector(state => state.accessToken)
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
  const [socket, setSocket] = useState()
  const [money, setMoney] = useState(0)
  const [creditTerm, setCreditTerm] = useState(0)
  //const [creditLine, setCreditLine] = useState(0)
  const [amount, setAmount] = useState("")
  const [status, setStatus] = useState("true")
  const [isFocused, setIsFocused] = useState(false)
  const { user: { userId, industryId } } = useSelector(state => state.user)
  const { pair: { pairId, supplierId, retailerId } } = useSelector(state => state.game)
  const { invoice } = useSelector(state => state.invoice)
  const dispatch = useDispatch()
  useEffect(() => {
    const s = io("http://localhost:3300")
    setSocket(s)
    console.log(s)
    s.emit("join", pairId)
    setStatus("false")
    return () => {
      s.disconnect()
    }
  }, [])
  useEffect(() => {
    if (socket == null) return
    socket.on("invoice-retailer", (invoice) => {
      console.log(invoice)
      setMoney(invoice.price)
      setCreditTerm(invoice.creditTerm)
      // setCreditLine(invoice.creditLine)
      setStatus("true")
    })
  }, [socket])
  const classes = useStyles();
  let history = useHistory();

  const handleChange = (event) => {
    setAmount(event.target.value);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  function tempSubmit(e) {
    e.preventDefault()
    setStatus("createInvoice")
    instance
      .post("http://localhost:3300/invoice", { amount, creditTerms: new Date(new Date().setMonth(new Date().getMonth() + parseInt(creditTerm))).toISOString().slice(0, 10), unitPrice: money, transactionDate: new Date().toISOString().slice(0, 10), paymentDate: new Date(new Date().setMonth(new Date().getMonth() + industryId)).toISOString().slice(0, 10), deliveryDate: new Date(new Date().setMonth(new Date().getMonth() + industryId)).toISOString().slice(0, 10), payable: money * amount, retailerId, supplierId }
      )
      .then(res => {
        // alert(res.data.invoice)
        socket.emit("sendInvoiceRetailer", res.data.invoice, pairId)
        dispatch(setInvoice(res.data.invoice))
        setStatus("final")
      })
      .catch((err) => {
        console.log(err);
      })
  }
  function validateForm() {
    return amount != "";
  }
  function handleIntoAdmin() {
    history.push("/retaileradmin");
  }

  //從等供應商定價畫面 => 議價表單出來
  function renderSwitch(param) {
    switch (param) {
      case "true":
        return (
          <>
            <Word>議價</Word>
            <Form onSubmit={tempSubmit}>
              <Content>
                <ContentWord>對方價格(單價)</ContentWord>
                <ContentWord style={{ color: "#757ce8" }}>{money}</ContentWord>
                <ContentWord>元</ContentWord>
              </Content>
              <Content>
                <ContentWord>Credit Term</ContentWord>
                <ContentWord style={{ color: "#757ce8" }}>
                  {creditTerm}
                </ContentWord>
                <ContentWord>個月</ContentWord>
              </Content>
              <Content>
                {/* <ContentWord>Credit Line</ContentWord>
                <ContentWord style={{ color: "#757ce8" }}>
                  {creditLine}
                </ContentWord>
                <ContentWord>百萬</ContentWord> */}
              </Content>
              <Content>
                <ContentWord>數量</ContentWord>
                <ContentWord style={{ color: "#757ce8" }}>
                  <NativeSelect
                    id="demo-customized-select-native"
                    value={amount}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                    onFocus={handleFocus}
                    style={{
                      borderBottomColor: isFocused ? "#f29979" : "#f29979",
                      width: "200px",
                    }}
                  >
                    <option aria-label="選擇產業" value="" />
                    <option value={100}>100 </option>
                    <option value={200}>200</option>
                    <option value={300}>300</option>
                  </NativeSelect>
                </ContentWord>
              </Content>
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
            <Word>等待供應商傳送契約</Word>
            <Loading />
          </>
        );
      case "createInvoice":
        return (
          <>
            <Word>建立契約</Word>
            <Loading />
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
              <ContentWord style={{ color: "#757ce8" }}>{amount}</ContentWord>
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
