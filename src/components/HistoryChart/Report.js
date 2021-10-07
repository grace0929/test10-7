import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
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
import { useSelector, useDispatch } from "react-redux";
import { RefreshAuthLogic } from "../../refreshAuthLogic";
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import axios from "axios";
import { setFlow } from "../../redux/userSlice";

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

export default function Report() {
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
  const dispatch = useDispatch()
  const { user: { flow } } = useSelector(state => state.user)
  const [report, setReport] = useState("");
  const [open, setOpen] = useState(false);
  const [records, setRecords] = useState("")
  const [lastRecord, setLastRecord] = useState("")
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
  function renderSwitch(param) {
    switch (param) {
      case 1:
        return <LastRating />;
      case 2:
        return <LastCash />;
      case 3:
        return <LastInventory />;
      case 4:
        return <LastLiability />;
      default:
        return <LastRating />;
    }
  }
  useEffect(() => {
    instance
      .get("http://localhost:3300/flows/me",
    )
      .then(res => {
        dispatch(setFlow(res.data.flow))
      })
      .catch((err) => {
        console.log(err);
      })
    instance
      .get("http://localhost:3300/records/me",
    )
      .then(res => {
        setRecords(res.data.records)
        if (res.data.records.length) {
          setLastRecord(res.data.records[0])
        } else {
          setLastRecord({ creditRating: "無", cash: "無", inventory: "無", liability: "無" })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <>
      <Block>
        <Card className={classes.root}>
          <CardContent>
            <CreditRating creditRating={flow.creditRating} lastCreditRating={lastRecord.creditRating} />
          </CardContent>
        </Card>
        <Card className={classes.root}>
          <CardContent>
            <Cash cash={flow.cash} lastCash={lastRecord.cash} />
          </CardContent>
        </Card>
        <Card className={classes.root}>
          <CardContent>
            <Inventory inventory={flow.inventory} lastInventory={lastRecord.inventory} />
          </CardContent>
        </Card>
        <Card className={classes.root}>
          <CardContent>
            <Liability liability={flow.liability} lastLiability={lastRecord.liability} />
          </CardContent>
        </Card>
      </Block>
      <ChartTitle>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">
            查看歷史報表
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={report}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>請選擇</em>
            </MenuItem>
            <MenuItem value={1}>信用等級</MenuItem>
            <MenuItem value={2}>現金流</MenuItem>
            <MenuItem value={3}>存貨報表</MenuItem>
            <MenuItem value={4}>債務報表</MenuItem>
          </Select>
        </FormControl>
      </ChartTitle>
      <ChartBlock>
        <Card className={classes.chart}>
          <CardContent>{renderSwitch(report)}</CardContent>
        </Card>
      </ChartBlock>
    </>
  );
}
