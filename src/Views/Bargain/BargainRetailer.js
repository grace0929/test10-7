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
import { RefreshAuthLogic } from "../../refreshAuthLogic";
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { initiateSocket, disconnectSocket, getSocket, isSocket } from '../../socket';
import { setBargain, setDisabled } from "../../redux/processSlice";
import { setInvoice, setAmount } from "../../redux/invoiceSlice";
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
export default function BargainRetailer(props) {
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
    const [creditLine, setCreditLine] = useState(0);
    const [amount, setAmount2] = useState("");
    // const [status, setStatus] = useState();
    const [isFocused, setIsFocused] = useState(false)
    const { user: { userId, industryId } } = useSelector(state => state.user)
    const { pair: { currentTime, pairId, supplierId, retailerId } } = useSelector(state => state.game)
    const { invoice } = useSelector(state => state.invoice)
    const { bargain } = useSelector(state => state.process)
    const dispatch = useDispatch()
    const classes = useStyles()

    const handleChange = (event) => {
        setAmount2(event.target.value)
    };
    const handleFocus = () => {
        setIsFocused(true);
    };
    // useEffect(() => {
    //     if (!isSocket()) return
    //     getSocket().on("invoice-retailer", (invoice) => {
    //         console.log(invoice)
    //         dispatch(setPayable(invoice.price))
    //         dispatch(setCreditTerms(invoice.creditTerm))
    //         // setCreditLine(invoice.creditLine)
    //         dispatch(setBargain(true))
    //     })
    // }, [getSocket()])
    function tempSubmit(e) {
        e.preventDefault()
        dispatch(setBargain("createInvoice"))
        instance
            .post("http://localhost:3300/invoice", { amount, creditTerms: new Date(new Date().setMonth(new Date(currentTime).getMonth() + parseInt(invoice.creditTerms))).toISOString().slice(0, 10), unitPrice: invoice.unitPrice, transactionDate: currentTime, paymentDate: new Date(new Date().setMonth(new Date(currentTime).getMonth() + industryId)).toISOString().slice(0, 10), deliveryDate: new Date(new Date().setMonth(new Date(currentTime).getMonth() + industryId)).toISOString().slice(0, 10), payable: invoice.unitPrice * amount, retailerId, supplierId }
            )
            .then(res => {
                // alert(res.data.invoice)
                getSocket().emit("sendInvoiceRetailer", res.data.invoice, pairId)
                dispatch(setInvoice(res.data.invoice))
                dispatch(setBargain("final"))
                dispatch(setDisabled(false))
                setAmount2("")
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //?????????????????????

    useEffect(() => {
        renderSwitch(bargain)
    }, [bargain])
    function validateForm() {
        return amount != "";
    }

    //??????step
    if (props.currentStep !== 1) {
        return null;
    }
    //??????????????????????????? => ??????????????????
    function renderSwitch(param) {
        switch (param) {
            case true:
                return (
                    <>
                        <Word>??????</Word>
                        <Form onSubmit={tempSubmit}>
                            <Content>
                                <ContentWord>????????????(??????)</ContentWord>
                                <ContentWord style={{ color: "#757ce8" }}>{invoice.unitPrice}</ContentWord>
                                <ContentWord>???</ContentWord>
                            </Content>
                            <Content>
                                <ContentWord>Credit Term</ContentWord>
                                <ContentWord style={{ color: "#757ce8" }}>
                                    {invoice.creditTerms}
                                </ContentWord>
                                <ContentWord>??????</ContentWord>
                            </Content>
                            <Content>
                                {/* <ContentWord>Credit Line</ContentWord>
                <ContentWord style={{ color: "#757ce8" }}>
                  {creditLine}
                </ContentWord>
                <ContentWord>??????</ContentWord> */}
                            </Content>
                            <Content>
                                <ContentWord>??????</ContentWord>
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
                                        <option aria-label="????????????" value="" />
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
                                    ?????????
                                </Button>
                            </ContentFooter>
                        </Form>
                    </>
                );
            case false:
                return (
                    <>
                        <Word>???????????????????????????</Word>
                        <Loading />
                    </>
                );
            case "createInvoice":
                return (
                    <>
                        <Word>????????????</Word>
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
            <Block>{renderSwitch(bargain)}</Block>
        </>
    );
}

//     //??????????????????????????? => ??????????????????
//     //?????????match?????? ?????????Tick??????
//     function renderSwitch(param) {
//         switch (param) {
//             case true:
//                 return (
//                     <Form onSubmit={tempSubmit}>
//                         <Content>
//                             <ContentWord>????????????</ContentWord>
//                             <ContentWord style={{ color: "#757ce8" }}>{money}</ContentWord>
//                         </Content>
//                         <Content>
//                             <ContentWord>Credit Term</ContentWord>
//                             <ContentWord style={{ color: "#757ce8" }}>
//                                 {creditTerm}
//                             </ContentWord>
//                         </Content>
//                         <Content>
//                             <ContentWord>Credit Line</ContentWord>
//                             <ContentWord style={{ color: "#757ce8" }}>
//                                 {creditLine}
//                             </ContentWord>
//                         </Content>
//                         <Content>
//                             <ContentWord>??????</ContentWord>
//                             <ContentWord style={{ color: "#757ce8" }}>
//                                 <NativeSelect
//                                     id="demo-customized-select-native"
//                                     value={amount}
//                                     onChange={handleChange}
//                                     input={<BootstrapInput />}
//                                     onFocus={handleFocus}
//                                     style={{
//                                         borderBottomColor: isFocused ? "#f29979" : "#f29979",
//                                         width: "200px",
//                                     }}
//                                 >
//                                     <option aria-label="????????????" value="" />
//                                     <option value={100}>100 </option>
//                                     <option value={200}>200</option>
//                                     <option value={300}>300</option>
//                                 </NativeSelect>
//                             </ContentWord>
//                         </Content>

//                         <ContentFooter style={{}}>
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 size="large"
//                                 className={classes.button}
//                                 endIcon={<SendIcon />}
//                                 onClick={tempSubmit}
//                                 disabled={!validateForm()}
//                             >
//                                 ??????
//                             </Button>
//                         </ContentFooter>
//                     </Form>
//                 );
//             default:
//                 return <></>;
//         }
//     }

//     return (
//         <>
//             <Block>
//                 <Word>{matchStatus ? "??????" : "????????????????????????..."}</Word>
//                 {renderSwitch(matchStatus)}
//             </Block>
//         </>
//     );
// }
