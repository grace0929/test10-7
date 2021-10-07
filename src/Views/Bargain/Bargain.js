import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";

import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import SendIcon from "@material-ui/icons/Send";
import { css } from "@emotion/react";

import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { useSelector, useDispatch } from "react-redux";
import { initiateSocket, disconnectSocket, getSocket } from '../../socket';
import { setBargainSupplier } from "../../redux/processSlice";
import { setInvoice, setCreditTerms, setPayable, setUnitPrice } from "../../redux/invoiceSlice";
import Loading from "../../components/Loading";
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
export default function Bargain(props) {

  const [money, setMoney] = useState("");
  const [creditTerms, setCreditTerms] = useState(0);
  // const [creditLine, setCreditLine] = useState(0);
  // const [status, setStatus] = useState();
  const [isFocused, setIsFocused] = useState(false);
  const { user: { userId } } = useSelector(state => state.user)
  const { pair: { pairId } } = useSelector(state => state.game)
  const { invoice } = useSelector(state => state.invoice)
  const { bargainSupplier } = useSelector(state => state.process)
  const dispatch = useDispatch()
  const classes = useStyles()

  // const handleChange = (event) => {
  //   setAmount(event.target.value);
  // };
  const handleFocus = () => {
    setIsFocused(true);
  };

  function tempSubmit(e) {
    e.preventDefault()
    dispatch(setBargainSupplier(false))

    getSocket().emit("sendInvoiceSupplier", { price: money, creditTerm: creditTerms }, pairId)
    setMoney("")
    setCreditTerms(0)
  }

  //等待企業傳送數量
  // useEffect(() => {
  //   if (!getSocket()) return
  //   getSocket().on("invoice-supplier", (invoice) => {
  //     console.log(invoice)
  //     setAmount(invoice.amount)
  //     dispatch(setInvoice(invoice))
  //     dispatch(setBargainSupplier("final"))
  //   })
  // }, [getSocket()])
  useEffect(() => {
    renderSwitch(bargainSupplier)
  }, [bargainSupplier])

  function validateForm() {
    return money != "" && creditTerms != 0;
  }

  //判斷step
  if (props.currentStep !== 1) {
    return null;
  }

  //等待企業傳送數量 => 議價表單出來
  //如果有match成功 則換成Tick畫面
  function renderSwitch(param) {
    switch (param) {
      case true:
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
                    value={creditTerms}
                    onChange={(e) => setCreditTerms(e.target.value)}
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
      case false:
        return (
          <>
            <Word>等待企業傳送契約</Word>
            <Loading />
          </>
        );
      case "final":
        return (
          <>
            <Word>契約產生</Word>
            <Content>
              <ContentWord>價格</ContentWord>
              <ContentWord style={{ color: "#757ce8" }}>{invoice.payable}</ContentWord>
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
              {/* <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                endIcon={<SendIcon />}
                onClick={tempSubmit}
              >
                進入決策中心
              </Button> */}
            </ContentFooter>
          </>
        );
      default:
        return <></>;
    }
  }

  return (
    <>
      <Block>{renderSwitch(bargainSupplier)}</Block>
    </>
  );
}

//   function renderSwitch(param) {
//     switch (param) {
//       case true:
//         return (

//           <Form onSubmit={tempSubmit}>
//             <Content>
//               <ContentWord>對方價格</ContentWord>
//               <ContentWord style={{ color: "#757ce8" }}>{money}</ContentWord>
//             </Content>
//             <Content>
//               <ContentWord>Credit Term</ContentWord>
//               <ContentWord style={{ color: "#757ce8" }}>
//                 {creditTerm}
//               </ContentWord>
//             </Content>
//             <Content>
//               <ContentWord>Credit Line</ContentWord>
//               <ContentWord style={{ color: "#757ce8" }}>
//                 {creditLine}
//               </ContentWord>
//             </Content>
//             <Content>
//               <ContentWord>數量</ContentWord>
//               <ContentWord style={{ color: "#757ce8" }}>
//                 <NativeSelect
//                   id="demo-customized-select-native"
//                   value={amount}
//                   onChange={handleChange}
//                   input={<BootstrapInput />}
//                   onFocus={handleFocus}
//                   style={{
//                     borderBottomColor: isFocused ? "#f29979" : "#f29979",
//                     width: "200px",
//                   }}
//                 >
//                   <option aria-label="選擇產業" value="" />
//                   <option value={100}>100 </option>
//                   <option value={200}>200</option>
//                   <option value={300}>300</option>
//                 </NativeSelect>
//               </ContentWord>
//             </Content>

//             <ContentFooter style={{}}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 className={classes.button}
//                 endIcon={<SendIcon />}
//                 onClick={tempSubmit}
//                 disabled={!validateForm()}
//               >
//                 送出
//               </Button>
//             </ContentFooter>
//           </Form>
//         );
//       default:
//         return <></>;
//     }
//   }

//   return (
//     <>
//       <Block>
//         {/* <Word>{matchStatus ? "議價" : "供應商傳送契約中..."}</Word> */}
//         {renderSwitch(matchStatus)}
//       </Block>
//     </>
//   );
// }
