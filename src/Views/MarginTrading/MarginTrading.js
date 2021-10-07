import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Alert from "react-bootstrap/Alert";
import Button from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { useSelector, useDispatch } from "react-redux";
import { RefreshAuthLogic } from "../../refreshAuthLogic";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { setDisabled, setMarginTrading } from "../../redux/processSlice";
import { setCash } from "../../redux/userSlice";
import InputBase from "@material-ui/core/InputBase";
const Block = styled.div`
  position: static;
  padding: 30px;
  width: 50vw;
  height: 51vh;
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
  display: flex;
  width: 250px;
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
  margin-top: 1%;
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
export default function MarginTrading(props) {
  const { accessToken } = useSelector((state) => state.accessToken)
  const { pair: { currentTime } } = useSelector(state => state.game)
  const { marginTrading } = useSelector(state => state.process)
  const dispatch = useDispatch();
  //auto handle request when accessToken was expired
  const instance = axios.create({
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  //auto handle request when accessToken was expired
  const refreshAuthLogic = RefreshAuthLogic();
  createAuthRefreshInterceptor(instance, refreshAuthLogic);
  const { user } = useSelector((state) => state.user);
  const [money, setMoney] = useState(0);
  // const [check, setCheck] = useState(false);
  const [level, setlevel] = useState(user.flow.creditRating);
  const [loanMoney, setLoanMoney] = useState();
  const [loanMessage, setloanMessage] = useState();
  const classes = useStyles();
  //判斷step
  if (props.currentStep !== 2) {
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
  function validateForm() {
    return money != "" && money != "0";
  }
  //clear loanagreement



  //click 還款 axios
  function handleClick() {
    instance
      .post("http://localhost:3300/loangreement", {
        facilityAmount: money,
        borrowerId: user.userId,
        loanType: "financial",
        loanStatus: "unpaid",
        effectiveDate: currentTime,
        maturityDate: new Date(
          new Date().setMonth(new Date().getMonth(currentTime) + user.industryId)
        )
          .toISOString()
          .slice(0, 10),
      })
      .then((res) => {
        setLoanMoney(res.data.loanagreement.facilityAmount)
        setloanMessage(res.data.message)
        dispatch(setMarginTrading(true))
        dispatch(setDisabled(false))
        dispatch(setCash(parseInt(res.data.loanagreement.facilityAmount)))
        setMoney("0")
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Block>
        <Word>融資契約</Word>
        <Content>
          <ContentWord>申請金額</ContentWord>
          <ContentWord style={{ color: "#757ce8" }}>
            <BootstrapInput
              id="demo-customized-textbox"
              value={money}
              style={{ width: "200px" }}
              onChange={(e) => setMoney(e.target.value)}
            />
          </ContentWord>
          {/* <ContentWord style={{ color: "#757ce8" }}>{money}</ContentWord> */}
        </Content>
        <Content>
          <ContentWord>申請人信用等級</ContentWord>
          <ContentWord style={{ color: "#757ce8" }}>{level}</ContentWord>
        </Content>
        <Content style={{ width: "40vw", height: "70px" }}>
          <Alert variant="success" show={marginTrading}>
            {loanMessage}： {loanMoney}
          </Alert>
        </Content>
        <ContentFooter style={{}}>
          {!marginTrading ? (
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              endIcon={<SendIcon />}
              onClick={handleClick}
              disabled={!validateForm()}
            >
              送出借貸
            </Button>
          ) : (null)}
        </ContentFooter>
      </Block>
    </>
  );
}
