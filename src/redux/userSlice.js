import { createSlice } from "@reduxjs/toolkit"


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {}
    },
    reducers: {
        storeUser: (state, action) => {
            state.user = action.payload
        },
        setRole: (state, action) => {
            state.user.role = action.payload
        },
        setIndustry: (state, action) => {
            state.user.industryId = action.payload
        },
        setPaired: (state, action) => {
            state.user.paired = action.payload
        },
        setFlow: (state, action) => {
            state.user.flow = action.payload
        },
        setCash: (state, action) => {
            state.user.flow.cash = state.user.flow.cash + action.payload
        }
    },
})
export const { storeUser, setRole, setIndustry, setPaired, setFlow, setCash } = userSlice.actions
export default userSlice.reducer
