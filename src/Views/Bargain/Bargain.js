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

  //????????????????????????
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

  //??????step
  if (props.currentStep !== 1) {
    return null;
  }

  //???????????????????????? => ??????????????????
  //?????????match?????? ?????????Tick??????
  function renderSwitch(param) {
    switch (param) {
      case true:
        return (
          <>
            <Word>??????</Word>
            <Form onSubmit={tempSubmit}>
              <Content>
                <ContentWord>??????(??????)</ContentWord>
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
                    <option aria-label="??????creditTerm" value="" />
                    <option value={1}>????????? </option>
                    <option value={2}>?????????</option>
                    <option value={3}>?????????</option>
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
                    <option aria-label="??????creditLine" value="" />
                    <option value={100}>????????? </option>
                    <option value={200}>???????????????</option>
                    <option value={300}>???????????????</option>
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
                  ?????????
                </Button>
              </ContentFooter>
            </Form>
          </>
        );
      case false:
        return (
          <>
            <Word>????????????????????????</Word>
            <Loading />
          </>
        );
      case "final":
        return (
          <>
            <Word>????????????</Word>
            <Content>
              <ContentWord>??????</ContentWord>
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
              <ContentWord>??????</ContentWord>
              <ContentWord style={{ color: "#757ce8" }}>{invoice.amount}</ContentWord>
            </Content>
            <Content>
              <ContentWord>?????????</ContentWord>
              <ContentWord style={{ color: "#757ce8" }}>
                {invoice.transactionDate}
              </ContentWord>
            </Content>
            <Content>
              <ContentWord>?????????</ContentWord>
              <ContentWord style={{ color: "#757ce8" }}>
                {invoice.deliveryDate}
              </ContentWord>
            </Content>
            <Content>
              <ContentWord>????????????</ContentWord>
              <ContentWord style={{ color: "#757ce8" }}>
                {invoice.paymentDate}
              </ContentWord>
            </Content>
            <Content>
              <ContentWord>????????????</ContentWord>
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
                ??????????????????
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
//               <ContentWord>????????????</ContentWord>
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
//               <ContentWord>??????</ContentWord>
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
//                   <option aria-label="????????????" value="" />
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
//                 ??????
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
//         {/* <Word>{matchStatus ? "??????" : "????????????????????????..."}</Word> */}
//         {renderSwitch(matchStatus)}
//       </Block>
//     </>
//   );
// }
