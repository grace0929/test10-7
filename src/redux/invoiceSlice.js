import { createSlice } from "@reduxjs/toolkit"

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState: {
        invoice: {}
    },
    reducers: {
        setInvoice: (state, action) => {
            state.invoice = action.payload
        },
        setAmount: (state, action) => {
            state.invoice.amount = action.payload
        },
        setCreditTerms: (state, action) => {
            state.invoice.creditTerms = action.payload
        },
        setPayable: (state, action) => {
            state.invoice.payable = action.payload
        },
        setUnitPrice: (state, action) => {
            state.invoice.unitPrice = action.payload
        },
    },
})
export const { setInvoice, setAmount, setCreditTerms, setPayable, setUnitPrice } = invoiceSlice.actions
export default invoiceSlice.reducer
