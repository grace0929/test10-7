import { createSlice } from "@reduxjs/toolkit"

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        messages: [],
        pair: {

        }
    },
    reducers: {
        setMessage: (state, action) => {
            state.messages.push(action.payload)
        },
        setPair: (state, action) => {
            state.pair = action.payload
        },
        setCurrentTime: (state, action) => {
            state.pair.currentTime = action.payload
        },

    },
    // extraReducers: {
    //     [sendMessage.pending]: (state, action) => {
    //         state.messages.push({
    //             id: action.meta.requestId,
    //             text: action.meta.arg,
    //             my: true,
    //         })
    //     },
    //     [sendMessage.rejected]: (state, action) => {
    //         state.messages = state.messages.filter(
    //             ms => ms.id !== action.meta.requestId
    //         )
    //     },
    // },
})
export const { setMessage, setPair, setCurrentTime } = gameSlice.actions
export default gameSlice.reducer
