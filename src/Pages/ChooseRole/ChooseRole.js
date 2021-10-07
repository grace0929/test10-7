import axios from "axios";
import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { useSelector, useDispatch } from "react-redux";
import { setRole } from "../../redux/userSlice";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import supplier from "../../assets/role.png";
import retailer from "../../assets/role.png";
import webSocket from 'socket.io-client'
import Modal from "react-bootstrap/Modal";

const ModalPlace = styled.div`
  margin-top: 1vh;
  //border: 2px solid black;
`;
const Background = styled.div`
  background-color: #b9d8da;
  position: absolute;
  padding: 0em;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
`;
const SCF = styled.div`
  position: static;
  width: 1000px;
  height: 100px;
  margin-top: 10%;
  margin-left: 35%;
  text-align: left;
  font-size: 50px;
  font-family: "Comic Sans MS";
  font-weight: bold;
  // border: 2px solid black;
  color: #ee786c;
`;
const Choose = styled.div`
  position: static;
  width: 1000px;
  height: 100px;
  margin-top: 5%;
  margin-left: 40%;
  text-align: left;
  font-size: 50px;
  font-family: "jf";
  font-weight: bold;
  // border: 2px solid black;
  color: #ee786c;
`;

const RoleBlock = styled.div`
  display: inline-flex;
  gap: 10vw;
  width: 100%;
  // border: 2px solid black;
  justify-content: center;
`;

const SupplierBlock = styled.div`
  position: relative;
  display: inline-block;
  width: 200px;
  height: 300px;
  margin-top: 5%;
  text-align: center;
  font-size: 50px;
  font-family: "jf";
  font-weight: bold;
  //border: 2px solid black;
  color: #ee786c;
`;
const RetailerBlock = styled.div`
  position: relative;
  display: inline-block;
  width: 200px;
  height: 300px;
  margin-top: 5%;
  text-align: center;
  font-size: 50px;
  font-family: "jf";
  font-weight: bold;
  //border: 2px solid black;
  color: #ee786c;
`;

export default function ChooseRole() {
  // const [role, setRole] = useState("");
  //dispatch data from redux
  const { user: { role } } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let history = useHistory();

  function toggleTrueFalse() {
    setShowModal(handleShow);
  }

  //選擇角色開啟modal
  function tempSubmit(e) {
    dispatch(setRole(e.target.value));
    toggleTrueFalse();

  }
  function handleChoice() {
    // axios
    //   .post("", {

    //   })
    //   .then((res) => {
    //     if (res.data) {
    //       history.push();
    //     } else alert("回傳錯誤");
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    //之後會把這行註解
    if (role === "supplier") {
      history.push("/supplier");
    } else {
      history.push("/retailer");
    }
  }

  const ModalContent = () => {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>{modalInfo.loanAgreementId}</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>確定要選擇{role}嗎？</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleChoice}>
            確定
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  return (
    <Background>
      <SCF>Supply Chain Financing</SCF>
      <Choose>請選擇您的角色</Choose>
      <RoleBlock>
        <SupplierBlock>
          <Button
            variant="outline-light"
            size="lg"
            style={{ color: "#ee786c" }}
            value={"supplier"}
            onClick={tempSubmit}
          >
            供應商
          </Button>
          <img
            src={supplier}
            style={{ width: "200px", height: "200px", marginTop: "3vh" }}
          />
        </SupplierBlock>
        <RetailerBlock>
          <Button
            variant="outline-light"
            size="lg"
            style={{ color: "#ee786c" }}
            value={"retailer"}
            onClick={tempSubmit}
          >
            企業
          </Button>
          <img
            src={supplier}
            style={{ width: "200px", height: "200px", marginTop: "3vh" }}
          />
        </RetailerBlock>
      </RoleBlock>

      <ModalPlace>{show ? <ModalContent /> : null}</ModalPlace>
    </Background>
  );
}
