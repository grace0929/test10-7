import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const refreshToken = createAsyncThunk(
    "accessToken/refreshToken",
    async () => {
        const res = await axios
            .post("http://localhost:3300/refresh_token", null, { withCredentials: true });
        return res.data.accessToken
    }

)

const accessTokenSlice = createSlice({
    name: "accessToken",
    initialState: {
        accessToken: "",
        status: null
    },
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        userlogout: state => {
            // From here we can take action only at this "counter" state
            // But, as we have taken care of this particular "logout" action
            // in rootReducer, we can use it to CLEAR the complete Redux Store's state
        }
    },
    extraReducers: {
        [refreshToken.pending]: (state, action) => {
            state.status = "loading"
        },
        [refreshToken.fulfilled]: (state, action) => {
            state.status = "success"
            state.accessToken = action.payload
        },
        [refreshToken.rejected]: (state, action) => {
            state.status = "failed"
        },
    }
})
export const { setAccessToken, userlogout } = accessTokenSlice.actions
export default accessTokenSlice.reducer
