import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { useState, useEffect } from "react";
import axios from "axios";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationFactory,
} from "react-bootstrap-table2-paginator";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { RefreshAuthLogic } from "../../refreshAuthLogic";
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";

const ModalPlace = styled.div`
  margin-top: 1vh;
  //border: 2px solid black;
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

export default function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user: { userId, industryId, classroomId, flow } } = useSelector(state => state.user)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [amount, setAmount] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [isFollow , setIsFollowed] = useState(false);
  const [repaymentInfo,setRepaymentInfo] =  useState([]);
  const { accessToken } = useSelector(state => state.accessToken)
  //auto handle request when accessToken was expired
  const instance = axios.create({
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  const refreshAuthLogic = RefreshAuthLogic()
  createAuthRefreshInterceptor(instance, refreshAuthLogic)
  const repayment = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Button
        onClick={() => {
          setIsFollowed(true);
        }}
      >
        還款
      </Button>
    );
  };
  const columns = [
    { dataField: "invoiceId", text: "契約編號" },
    { dataField: "transactionDate", text: "交易日" },
    { dataField: "deliveryDate", text: "交貨日" },
    { dataField: "paymentDate", text: "交貨款日" },
    { dataField: "amount", text: "數量" },
    { dataField: "unitPrice", text: "單價" },
    { dataField: "payable", text: "應付款項" },
    { dataField: "creditTerms", text: "信用條件" },
    { dataField: "invoiceStatus", text: "付款狀態" },
    { dataField: "repayment", text: "還款"  ,formatter: repayment }
  ];


  const rowEvents = {
    onClick: (e, row) => {
      console.log(row);
      setModalInfo(row);
      setRepaymentInfo(row);
      toggleTrueFalse();
    },
  };

  const toggleTrueFalse = () => {
    setShowModal(handleShow);
  };
  

  //get invoice api
  const getData = () => {
    instance
      .get("http://localhost:3300/invoice/me",
    )
      .then(res => {
        setInvoices(res.data.invoices)
      })
      .catch((err) => {
        console.log(err);
      })
  };
  useEffect(() => {
    getData();
  }, []);

  // 還款 API 放在這裡
  function handleRepayment(){
    //如果金額不足 alert錢不夠 直接return
    console.log(repaymentInfo.payable);
    if(flow.cash <repaymentInfo.payable ){
      alert("現金不足，無法還款");
      handleClose();
      return;
    }
    console.log("我還款了" + repaymentInfo.invoiceId);
    handleClose();
  }

  const ModalContent = () => {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>契約編號{modalInfo.invoiceId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <ul>
            <ol>交易日：{modalInfo.transactionDate}</ol>
            <ol>交貨日：{modalInfo.deliveryDate}</ol>
            <ol>交貨款日：{modalInfo.paymentDate}</ol>
            <ol>數量：{modalInfo.amount}</ol>
            <ol>單價：{modalInfo.unitPrice}</ol>
            <ol>應付款項：{modalInfo.payable}</ol>
            <ol>信用條件：{modalInfo.creditTerms}</ol>
          </ul> */}
          是否確定要還款?

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            關閉
          </Button>
          {modalInfo.invoiceStatus==="unpaid" ?  <Button variant="danger" onClick={handleRepayment}>
            確定還款
          </Button> : null}
         
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <BootStrapTable
        keyField="stockId"
        data={invoices} //換成invoice
        columns={columns}
        pagination={paginationFactory()}
        
        rowEvents={rowEvents}
      />
      <ModalPlace>{show ? <ModalContent /> : null}</ModalPlace>
    </>
  );
}
