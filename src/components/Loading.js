import { useState } from "react";
import styled from "styled-components";
//loader
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";

//loader css
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #f29979;
  margin-top: 20%;
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

export default function Loading({}) {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#f29979");
  return (
    <>
      <Content>
        <SyncLoader
          color={color}
          loading={loading}
          css={override}
          size={20}
          speedMultiplier={0.5}
        />
      </Content>
    </>
  );
}
