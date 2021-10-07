import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    bargain: false,
    bargainSupplier: true,
    marginTrading: false,
    madeProduct: false,
    delivery: false,
    deliveryPayment: false,
    receipt: false,
    merchandise: false,
    finish: false,
    finsihRetailer: false,
    status: 2,
    disabled: true,
}

const processSlice = createSlice({
    name: "process",
    initialState,
    reducers: {
        setBargain: (state, action) => {
            state.bargain = action.payload
        },
        setBargainSupplier: (state, action) => {
            state.bargainSupplier = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setDisabled: (state, action) => {
            state.disabled = action.payload
        },
        setMarginTrading: (state, action) => {
            state.marginTrading = action.payload
        },
        setDelivery: (state, action) => {
            state.delivery = action.payload
        },
        setDeliveryPayment: (state, action) => {
            state.deliveryPayment = action.payload
        },
        setReceipt: (state, action) => {
            state.receipt = action.payload
        },
        setMerchandise: (state, action) => {
            state.merchandise = action.payload
        },
        setFinish: (state, action) => {
            state.finish = action.payload
        },
        setFinishRetailer: (state, action) => {
            state.finishRetailer = action.payload
        },
        setMadeProduct: (state, action) => {
            state.madeProduct = action.payload
        },
        reset: (state, action) => {
            // THIS WORKS!!!!
            return initialState
        },
    },
})
export const { reset, setBargain, setBargainSupplier, setStatus, setDisabled, setMarginTrading, setDelivery, setReceipt, setMerchandise, setFinish, setDeliveryPayment, setFinishRetailer, setMadeProduct } = processSlice.actions
export default processSlice.reducer
