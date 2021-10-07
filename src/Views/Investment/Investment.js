import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { useState, useEffect } from "react";
import axios from "axios";
import { RefreshAuthLogic } from "../../refreshAuthLogic";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { useSelector, useDispatch } from "react-redux";
import { setCash } from "../../redux/userSlice";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationFactory,
} from "react-bootstrap-table2-paginator";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import { makeStyles, withStyles, Card, CardContent } from "@material-ui/core";
import Form from "react-bootstrap/Form";
//已投資data
import InvestData from "../../TempData/InvestData";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { CancelPresentationOutlined } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";

const ModalPlace = styled.div`
  margin-top: 1vh;
  //border: 2px solid black;
`;
const Title = styled.div`
  margin: 1vh;
  font-weight: bold;
  font-size: 20px;
`;
const Block = styled.div`
  position: static;
  display: flex;
  width: 95%;
  margin-top: 2vh;
  margin-left: 2vw;
  margin-bottom: 2vw;
  text-align: left;
  font-family: "jf";
  font-weight: bold;
  background-color: none;
  border: 8px solid #adceed;
  border-radius: 10px;
  color: black;
`;
const useStyles = makeStyles((theme) => ({
  root: {
    width: "15rem",
    marginRight: 20,
    minHeight: "20vh",
    fontFamily: "jf",
    backgroundColor: "none",
  },
  title: {
    fontSize: 30,
  },
  content: {
    fontSize: 18,
  },
}));

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

export default function Investment() {
  const classes = useStyles();
  //已投資股票
  const [investData, setInvestData] = useState([]);
  const [stock, setStock] = useState([]);
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [amount, setAmount] = useState("");
  // const [isFocused, setIsFocused] = useState(false);
  const [sellAmount, setSellAmount] = useState(0);
  const [sellBtn, setSellBtn] = useState(false);
  const [sellModalInfo, setSellModalInfo] = useState([]);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const handleSellClose = () => setSellBtn(false);
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.accessToken);
  const {
    user: { userId },
  } = useSelector((state) => state.user);
  const {
    pair: { currentTime },
  } = useSelector((state) => state.game);
  //auto handle request when accessToken was expired
  const instance = axios.create({
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const refreshAuthLogic = RefreshAuthLogic();
  createAuthRefreshInterceptor(instance, refreshAuthLogic);
  const getData = async () => {
    instance
      .get("http://localhost:3300/stocks")
      .then((res) => {
        setStock(res.data.stocks);
      })
      .catch((err) => {
        console.log(err);
      });
    instance
      .get("http://localhost:3300/investments/me")
      .then((res) => {
        setInvestData(res.data.investments);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { dataField: "stockId", text: "代碼" },
    { dataField: "stockName", text: "公司名稱" },
    { dataField: "sharePrice", text: "買進價格/股" },
    { dataField: "expectedReturn", text: "預期收益/股" },
    { dataField: "riskFactor", text: "風險因子" },
  ];

  const rowEvents = {
    onClick: (e, row) => {
      setModalInfo(row);
      toggleTrueFalse();
    },
  };
  function handleSell(row) {
    setSellBtn(true);
    console.log(row);
    setSellModalInfo(row);
    toggleSellModalOpen();
  }
  const toggleSellModalOpen = () => {
    setSellModalOpen(true);
  };
  //送出要賣的股票數量
  function sellSubmit() {
    instance
      .patch("http://localhost:3300/investments/me", {
        investmentId: sellModalInfo.investmentId,
        sellPrice: sellModalInfo.stock.expectedReturn * sellAmount,
        lastShareAmount: sellModalInfo.shareAmount - sellAmount,
        lastAmount:
          sellModalInfo.investmentAmount -
          sellModalInfo.stock.expectedReturn * sellAmount,
      })
      .then((res) => {
        const index = investData.findIndex(
          (element) => element.investmentId === sellModalInfo.investmentId
        );
        const data = investData;
        if (sellModalInfo.shareAmount - sellAmount === 0) {
          data.splice(index, 1);
          setInvestData(data);
        } else {
          data[index].investmentAmount =
            sellModalInfo.investmentAmount -
            sellModalInfo.stock.expectedReturn * sellAmount;
          data[index].shareAmount = sellModalInfo.shareAmount - sellAmount;
          setInvestData(data);
        }
        dispatch(
          setCash(parseInt(sellModalInfo.stock.expectedReturn * sellAmount))
        );
        alert("成功售出!");
        handleSellClose();
      })
      .catch((err) => {
        console.log(err);
        alert("交易失敗");
        handleSellClose();
      });
  }

  const toggleTrueFalse = () => {
    setShowModal(handleShow);
  };
  //買進的dropdownlist
  const handleChange = (event) => {
    setAmount(event.target.value);
    // alert(event.target.value);
  };
  //賣出的dropdownlist
  const handleSellChange = (e) => {
    setSellAmount(e.target.value);
  };
  // const handleFocus = () => {
  //   setIsFocused(true);
  // };
  //買進 api
  function tempSubmit(e) {
    e.preventDefault();
    instance
      .post("http://localhost:3300/investments", {
        investorId: userId,
        stockId: modalInfo.stockId,
        investmentAmount: modalInfo.sharePrice * amount,
        shareAmount: amount,
        investmentDate: currentTime,
      })
      .then((res) => {
        const index = investData.findIndex(
          (element) => element.investmentId === res.data.investment.investmentId
        );
        if (index == -1) {
          //尚未投資過此公司
          setInvestData((prevState) => [
            {
              investmentId: res.data.investment.investmentId,
              stock: {
                stockName: modalInfo.stockName,
                expectedReturn: modalInfo.expectedReturn,
              },
              shareAmount: amount,
            },
            ...prevState,
          ]);
        } else {
          //投資過此公司
          const data = investData;
          //排序方式一：不動
          data[index] = res.data.investment;
          //排序方式二：買進的排到前面
          // data.splice(index, 1)
          // data.unshift(res.data.investment)
          setInvestData(data);
          // setInvestData(prevState => [{ ...prevState, res.data.investment }])
        }
        dispatch(setCash(-modalInfo.sharePrice * amount));
        alert("購買成功!");
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        alert("購買失敗");
        handleClose();
      });
  }
  function validateForm() {
    return amount != "";
  }
  function validateSellForm() {
    return sellAmount != "";
  }

  return (
    <>
      <Title>我的投資</Title>
      <ScrollMenu
        arrowLeft={
          <div style={{ fontSize: "30px", margin: "0px" }}>{" < "}</div>
        }
        arrowRight={<div style={{ fontSize: "30px" }}>{" > "}</div>}
        data={investData.map((item, i) => (
          <tr key={i}>
            <Card className={classes.root}>
              <CardContent className={classes.content}>
                investmentId：{item.investmentId}
              </CardContent>
              <CardContent className={classes.content}>
                公司名稱：{item.stock.stockName}
              </CardContent>
              <CardContent className={classes.content}>
                買進數量：{item.shareAmount}
              </CardContent>
              <CardContent className={classes.content}>
                當前賣出價格/股：{item.stock.expectedReturn}
              </CardContent>
              <CardContent className={classes.content}>
                <Button onClick={() => handleSell(item)}>賣出</Button>
              </CardContent>
            </Card>
          </tr>
        ))}
      />
      <Title>投資市場</Title>
      <BootStrapTable
        keyField="stockId"
        data={stock}
        columns={columns}
        pagination={paginationFactory()}
        rowEvents={rowEvents}
      />
      {/* 買股票modal */}
      <ModalPlace>
        {show ? (
          <Modal
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>{modalInfo.stockName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={tempSubmit}>
                <ul>
                  <ol>股票編號：{modalInfo.stockId}</ol>
                  <ol>股價（一股）：{modalInfo.sharePrice}</ol>
                  <ol>預期收益：{modalInfo.expectedReturn}</ol>
                  <ol>風險因子：{modalInfo.riskFactor}</ol>
                  <ol>
                    買進：
                    {/* <NativeSelect
                      id="demo-customized-select-native"
                      value={amount}
                      // onChange={handleChange}
                      onChange={(event) => setAmount(event.target.value)}
                      input={<BootstrapInput />}
                      // onFocus={handleFocus}
                      style={{
                        // borderBottomColor: isFocused ? "#f29979" : "#f29979",
                        width: "200px",
                      }}
                    >
                      <option aria-label="選擇產業" value="0" />
                      <option value={1}>1 </option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </NativeSelect> */}
                    <TextField
                      id="filled-number"
                      label="Number"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                    />
                    <Button
                      variant="primary"
                      onClick={tempSubmit}
                      disabled={!validateForm()}
                      style={{ marginLeft: "1vw" }}
                    >
                      買！
                    </Button>
                  </ol>
                </ul>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                關閉
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}
      </ModalPlace>
      {/* 賣出股票modal */}
      <ModalPlace>
        {sellBtn ? (
          <Modal
            show={sellModalOpen}
            onHide={handleSellClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>{sellModalInfo.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={sellSubmit}>
                <ul>
                  <ol>公司代碼：{sellModalInfo.stockId}</ol>
                  <ol>目前擁有：{sellModalInfo.shareAmount} 張</ol>
                  <ol>
                    當前賣出價格/股：＄{sellModalInfo.stock.expectedReturn}
                  </ol>
                  <ol>
                    目前賣出價格：＄
                    {sellModalInfo.stock.expectedReturn * sellAmount}
                  </ol>
                  <ol>
                    賣出：
                    <NativeSelect
                      id="demo-customized-select-native"
                      value={sellAmount}
                      onChange={handleSellChange}
                      input={<BootstrapInput />}
                      // onFocus={handleFocus}
                      style={{
                        // borderBottomColor: isFocused ? "#f29979" : "#f29979",
                        width: "200px",
                      }}
                    >
                      股
                      <option aria-label="選擇數量" value="" />
                      <option value={1}>1 </option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </NativeSelect>
                    <Button
                      variant="primary"
                      onClick={sellSubmit}
                      disabled={!validateSellForm()}
                      style={{ marginLeft: "1vw" }}
                    >
                      賣！
                    </Button>
                  </ol>
                </ul>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleSellClose}>
                關閉
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}
      </ModalPlace>
    </>
  );
}