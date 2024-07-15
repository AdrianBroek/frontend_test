import { text } from "@fortawesome/fontawesome-svg-core";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    text: "",
    additionalText: []
}

const textReducer = createSlice({
    name: "text",
    initialState,
    reducers: {
        addText: (state, action) => {
            const additionalText = action.payload;
            state.additionalText.push(additionalText);
        },
        replateText: (state, action) => {
            const replacement = action.payload;
            state.additionalText[state.additionalText.length - 1] = replacement;
        },
        resetText: (state) => {
            state.text = "";
            state.additionalText = [];
        }
    }
})

export const {addText,replateText,resetText} = textReducer.actions;
export default textReducer.reducer;