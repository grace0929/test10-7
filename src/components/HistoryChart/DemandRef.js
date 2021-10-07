import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Demand from "./DemandReport/Demand";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  Select,
} from "@material-ui/core";
import styled from "styled-components";

//import components
import CreditRating from "./ReportComp/CreditRating";
import Cash from "./ReportComp/Cash";
import Inventory from "./ReportComp/Inventory";
import Liability from "./ReportComp/Liability";
import LastRating from "./ReportComp/LastRating";
import LastCash from "./ReportComp/LastCash";
import LastInventory from "./ReportComp/LastInventory";
import LastLiability from "./ReportComp/LastLiability";
import { Switch } from "react-router";

const Block = styled.div`
  position: static;
  display: flex;
  width: 100%;
  margin-top: 2vh;
  margin-left: 2vw;
  text-align: left;
  font-size: 50px;
  font-family: "jf";
  font-weight: bold;
  background-color: #ffffffd5;
  //border: 8px solid #adceed;
  border-radius: 10px;
  color: black;
`;
const ChartTitle = styled.div`
  position: static;
  display: flex;
  width: 100%;
  margin-top: 2vh;
  margin-left: 2vw;
  text-align: left;
  font-size: 30px;
  font-family: "jf";
  font-weight: bold;
  background-color: #ffffffd5;
  //border: 8px solid #adceed;
  border-radius: 10px;
  color: black;
`;
const ChartBlock = styled.div`
  position: static;
  display: flex;
  width: 100%;
  margin-top: 2vh;
  margin-left: 2vw;
  text-align: left;
  font-size: 50px;
  font-family: "jf";
  font-weight: bold;
  background-color: #ffffffd5;
  //border: 8px solid #adceed;
  border-radius: 10px;
  color: black;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "20vw",
    marginRight: 20,
    minHeight: "20vh",
    fontFamily: "jf",
    // backgroundColor: "#adceed",
  },
  chart: {
    minWidth: "91%",
    marginRight: 20,
    minHeight: "40vh",
    fontFamily: "jf",
    // border: "2px solid black",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function DemandRef() {
  const [report, setReport] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleChange = (event) => {
    setReport(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <ChartTitle></ChartTitle>
      <ChartBlock>
        <Card className={classes.chart}>
          <CardContent>
            <Demand />
          </CardContent>
        </Card>
      </ChartBlock>
    </>
  );
}
