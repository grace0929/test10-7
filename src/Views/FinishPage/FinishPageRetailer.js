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
export default function FinishPage(props) {
    // const [money, setMoney] = useState(0);
    // const [creditTerm, setCreditTerm] = useState(0);
    // const [creditLine, setCreditLine] = useState(0);
    // const [amount, setAmount] = useState("");
    // const [matchStatus, setMatchStatus] = useState(false);
    // const [isFocused, setIsFocused] = useState(false);

    // const classes = useStyles();

    // const handleChange = (event) => {
    //     setAmount(event.target.value);
    // };
    // const handleFocus = () => {
    //     setIsFocused(true);
    // };

    //判斷step
    if (props.currentStep !== 5) {
        return null;
    }




    return (
        <>
            <Block>
                <Word>完成流程!</Word>
            </Block>
        </>
    );
}
