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
import { setDisabled, setMadeProduct } from "../../redux/processSlice";
import { useSelector, useDispatch } from "react-redux";
const gif = "https://media.giphy.com/media/26DMVBP5MLkooJV28/giphy.gif";

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
export default function MadeProduct(props) {
  const { madeProduct } = useSelector(state => state.process)
  const [check, setCheck] = useState(false);
  const [matchStatus, setMatchStatus] = useState(false);
  const dispatch = useDispatch()
  const classes = useStyles();

  //判斷step
  if (props.currentStep !== 3) {
    return null;
  }
  //click 跳過+axios
  function handleClick() {
    dispatch(setDisabled(false))
    dispatch(setMadeProduct(true))
    alert("商品製作完成!");
  }

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
          {madeProduct ? "製作完成!" : "製作產品中..."}
          {madeProduct ? (
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
              Skip
            </Button>
          )}
        </Word>

        {renderSwitch(matchStatus)}
      </Block>
    </>
  );
}
