import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
} from "reactstrap";
import BargainRetailer from "../Bargain/BargainRetailer"; //1
import FinishPageRetailer from "../FinishPage/FinishPageRetailer"; //5

import styled from "styled-components";
import MultiStepProgressBarRetailer from "./MultiStepProgressBarRetailer";
//retailer components
import Merchandise from "../Merchandise/Merchandise"; //販賣商品3
import DeliveryPayment from "../DeliveryPayment/DeliveryPayment"; //繳交貨款4
import ReceiptDate from "../ReceiptDate/ReceiptDate"; //收貨2
import { useSelector, useDispatch } from "react-redux";
import { setStatus, setDisabled, reset } from "../../redux/processSlice";
import { setCurrentTime } from "../../redux/gameSlice";
import axios from "axios";
import { RefreshAuthLogic } from "../../refreshAuthLogic";
import createAuthRefreshInterceptor from 'axios-auth-refresh';
export default function ProcessFormRetailer() {
  const dispatch = useDispatch()
  const { accessToken } = useSelector(state => state.accessToken)
  const { status, disabled, finishRetailer } = useSelector(state => state.process)
  const { user: { userId } } = useSelector(state => state.user)
  const { user: { flow: { creditRating, cash, inventory, liability } } } = useSelector(state => state.user)
  // const { pair: { currentTime, pairId, supplierId, retailerId } } = useSelector(state => state.game)
  const { pair } = useSelector(state => state.game)
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
  const handleNext = async () => {
    dispatch(setStatus(status + 1))
    dispatch(setDisabled(true))
  }
  const handleFinish = async () => {
    instance
      .post("http://localhost:3300/records", { userId, creditRating, cash, inventory, liability, recordDate: pair.currentTime }
      )
      .then(res => {
        dispatch(setCurrentTime(new Date(new Date().setMonth(new Date(pair.currentTime).getMonth() + 1)).toISOString().slice(0, 10)))
        instance
          .patch("http://localhost:3300/pairs/me", pair
          )
          .then(res => {
            dispatch(reset())
            dispatch(setStatus(1))
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      })
  }



  return (
    <>
      <Form onSubmit={handleNext}>
        <Card>
          <CardHeader>交易流程</CardHeader>
          <CardBody>
            <CardTitle>
              <MultiStepProgressBarRetailer
                currentStep={status}
              />
            </CardTitle>
            <CardText />
            <BargainRetailer
              currentStep={status}
            />
            <ReceiptDate
              currentStep={status}

            />
            <Merchandise
              currentStep={status}
            />
            <DeliveryPayment
              currentStep={status}

            />
            <FinishPageRetailer
              currentStep={status}

            />
          </CardBody>

          <CardFooter>
            {finishRetailer && status == 5 ? (<Button color="primary float-right" onClick={handleFinish}>完成</Button>) : (<Button color="primary float-right" disabled={disabled} onClick={handleNext}>下一步</Button>)}
          </CardFooter>
        </Card>
      </Form>
    </>
  );
}



