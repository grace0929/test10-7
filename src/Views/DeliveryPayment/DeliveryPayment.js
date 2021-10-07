import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Alert from "react-bootstrap/Alert";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { useSelector, useDispatch } from "react-redux";
import { RefreshAuthLogic } from "../../refreshAuthLogic";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { initiateSocket, disconnectSocket, getSocket } from '../../socket';
import { setDisabled, setDeliveryPayment, setFinishRetailer } from "../../redux/processSlice";
import { setCash } from "../../redux/userSlice";
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
  margin-top: -8vh;
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
    marginTop: "0%",
  },
}));
export default function DeliveryPayment(props) {
  const { accessToken } = useSelector((state) => state.accessToken);
  //auto handle request when accessToken was expired
  const instance = axios.create({
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  //auto handle request when accessToken was expired
  const refreshAuthLogic = RefreshAuthLogic();
  createAuthRefreshInterceptor(instance, refreshAuthLogic)
  const dispatch = useDispatch()
  const { invoice } = useSelector((state) => state.invoice)
  const { pair: { pairId } } = useSelector(state => state.game)
  const { deliveryPayment } = useSelector(state => state.process)
  const [day, setDay] = useState("6/28");
  const [creditLine, setCreditLine] = useState("7/28");
  const [money, setMoney] = useState(0);
  const [check, setCheck] = useState(false);
  const classes = useStyles();
  const {
    pair: { supplierId, createdAt },
  } = useSelector((state) => state.game);
  //判斷step
  if (props.currentStep !== 4) {
    return null;
  }
  //click 還款 axios
  function handleClick() {
    instance
      .patch("http://localhost:3300/flows/cash", {
        invoiceId: invoice.invoiceId,
        type: "payment",
        cash: invoice.payable,
        supplierId,
        pairCreatedAt: createdAt,
      })
      .then((res) => {
        getSocket().emit("sendMessage", { type: "deliveryPayment", cash: invoice.payable }, pairId)
        dispatch(setCash(-invoice.payable))
        dispatch(setDeliveryPayment(true))
        dispatch(setFinishRetailer(true))
        dispatch(setDisabled(false))
        alert("還款成功!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Block>
        <Word>繳交貨款</Word>
        <Content>
          <ContentWord>繳交日期</ContentWord>
          <ContentWord style={{ color: "#757ce8" }}>
            {invoice.paymentDate}
          </ContentWord>
        </Content>
        <Content>
          <ContentWord>Credit Term</ContentWord>
          <ContentWord style={{ color: "#757ce8" }}>
            {invoice.creditTerms}
          </ContentWord>
        </Content>
        <Content>
          <ContentWord>須繳金額</ContentWord>
          <ContentWord style={{ color: "#757ce8" }}>
            {invoice.payable}
          </ContentWord>
        </Content>
        <Content style={{ width: "40vw", height: "70px", marginLeft: "9%" }}>
          <Alert variant="success" show={deliveryPayment}>
            🦶款成功！
          </Alert>
        </Content>
        <ContentFooter style={{}}>
          {deliveryPayment ? (null) : (<Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            endIcon={<SendIcon />}
            onClick={handleClick}
          >
            進行還款
          </Button>)}
        </ContentFooter>
      </Block>
    </>
  );
}
