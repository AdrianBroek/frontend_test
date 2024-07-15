import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alertList: []
}

const alertSlice = createSlice({
    name: "alertList",
    initialState,
    reducers: {
        callAlert: (state, action) => {
            state.alertList = [
                ...state.alertList,
                ...action.payload
            ]
        },
        clearAlert: (state, action) => {
            let id = action.payload
            state.alertList = state.alertList.filter((alert) => alert.id !== id);
        }
    }
})

export const {callAlert,clearAlert} = alertSlice.actions;
export default alertSlice.reducer;