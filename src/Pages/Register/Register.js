import axios from "axios";
import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const Background = styled.div`
  background-color: #b9d8da;
  box-sizing: border-box;
  position: absolute;
  padding: 0em;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
`;
const RegisterForm = styled.div`
  margin: 0 auto;
  margin-top: 10%;
  max-width: 350px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 15%,
    transparent 50%,
    transparent 85%,
    rgba(255, 255, 255, 0.3) 100%
  );
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
  font-family: "jf";
`;

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [check, setCheck] = useState(false);
  let history = useHistory();
  function validateForm() {
    return email.length > 0 && password.length > 0 && name.length > 0;
  }
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3300/users", { email, name, password }, { withCredentials: true })
      .then((res) => {
        if (res.status === 201) {
          setCheck(true)
          setTimeout(function () {
            history.push("/login")
          }, 2000);
        } else alert("註冊失敗");
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert("信箱已註冊!");
        }
        console.log(err)
      });
  }
  return (
    <Background>
      <RegisterForm>
        <Alert variant="success" show={check}>
          成功註冊，將於2秒後回到登入頁面
        </Alert>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>帳號</Form.Label>
            <Form.Control
              type="email"
              autoComplete="on"
              style={{
                outline: "none",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "transparent",
                padding: "8px 10px",
                borderRadius: "10px",
                color: "black",
                fontSize: "16px",
                fontWeight: "600",
                boxShadow: "inset 0 0 25px rgba(0,0,0,0.2)",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>玩家暱稱</Form.Label>
            <Form.Control
              type="name"
              autoComplete="on"
              style={{
                outline: "none",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "transparent",
                padding: "8px 10px",
                borderRadius: "10px",
                color: "black",
                fontSize: "16px",
                fontWeight: "600",
                boxShadow: "inset 0 0 25px rgba(0,0,0,0.2)",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>密碼</Form.Label>
            <Form.Control
              type="password"
              autoComplete="on"
              style={{
                outline: "none",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "transparent",
                padding: "8px 10px",
                borderRadius: "10px",
                color: "black",
                fontSize: "16px",
                fontWeight: "600",
                boxShadow: "inset 0 0 25px rgba(0,0,0,0.2)",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            style={{
              fontWeight: "900",
              width: "5rem",
              margin: "10px 10px 10px 50px",
              border: "none",
              borderRadius: "30px",
              color: "#ee786c",
              backgroundColor: "#fff",
              transition: "all ease .5s",
              ":hover": {
                backgroundColor: "#ee786c",
                color: "#ffffff",
              },
            }}
            type="submit"
            disabled={!validateForm()}
          >
            註冊
          </Button>
          <Link to="/login" replace>
            <Button
              style={{
                position: "static",
                fontWeight: "900",
                border: "none",
                width: "5rem",
                margin: "0.5vw",
                borderRadius: "30px",
                color: "#ee786c",
                backgroundColor: "#fff",
                transition: "all ease .5s",
                ":hover": {
                  backgroundColor: "#ee786c",
                  color: "#ffffff",
                },
              }}
              type="submit"
            // href="/login"
            >
              登入
            </Button>
          </Link>
        </Form>
      </RegisterForm>
    </Background>
  );
}
