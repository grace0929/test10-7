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
import Form from "react-bootstrap/Form";
import { RefreshAuthLogic } from "../../refreshAuthLogic";
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useSelector, useDispatch } from "react-redux";
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

export default function LoanAgreement() {
  const [loans, setLoans] = useState([]);
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [amount, setAmount] = useState("")
  const [isFocused, setIsFocused] = useState(false)
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

  const data = [
    {
      loanAgreementId: "1",
      loanType: "借貸",
      facilityAmount: 8.3,
      effectiveDate: "1/1",
      maturityDate: "3/9",
      loanStatus: "尚未",
    },
    {
      loanAgreementId: "2",
      loanType: "融資",
      facilityAmount: 8.3,
      effectiveDate: "1/1",
      maturityDate: "3/9",
      loanStatus: "尚未",
    },
    {
      loanAgreementId: "3",
      loanType: "融資",
      facilityAmount: 8.3,
      effectiveDate: "1/1",
      maturityDate: "3/9",
      loanStatus: "尚未",
    },
  ];

  const columns = [
    { dataField: "loanAgreementId", text: "契約編號" },
    { dataField: "loanType", text: "借貸類別" },
    { dataField: "facilityAmount", text: "借款金額" },
    { dataField: "effectiveDate", text: "生效日期" },
    { dataField: "maturityDate", text: "到期日" },
    { dataField: "loanStatus", text: "還款狀態" },
  ];

  const rowEvents = {
    onClick: (e, row) => {
      setModalInfo(row);
      toggleTrueFalse();
    },
  };

  const toggleTrueFalse = () => {
    setShowModal(handleShow);
  };

  //get loan agreement api
  const getData = () => {
    instance
      .get("http://localhost:3300/loangreement/me",
    )
      .then(res => {
        setLoans(res.data.loanagreements)
      })
      .catch((err) => {
        console.log(err);
      })
  };
  useEffect(() => {
    getData();
  }, []);

  const ModalContent = () => {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.loanAgreementId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <ol>契約編號：{modalInfo.loanAgreementId}</ol>
            <ol>借貸類別：{modalInfo.loanType}</ol>
            <ol>借款金額：{modalInfo.facilityAmount}</ol>
            <ol>生效日期：{modalInfo.effectiveDate}</ol>
            <ol>到期日：{modalInfo.maturityDate}</ol>
            <ol>還款狀態：{modalInfo.loanStatus}</ol>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <BootStrapTable
        keyField="stockId"
        data={loans} //記得換成loan
        columns={columns}
        pagination={paginationFactory()}
        rowEvents={rowEvents}
      />
      <ModalPlace>{show ? <ModalContent /> : null}</ModalPlace>
    </>
  );
}
