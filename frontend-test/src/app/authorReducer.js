import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    author: ""
}

const authorSlice = createSlice({
    name: "author",
    initialState,
    reducers: {
        showAuthor: (state) => {
            state.author = "Adrian Brożek"
        },
        hideAuthor: (state) => {
            state.author = ""
        }
    }
})

export const {showAuthor,hideAuthor} = authorSlice.actions;
export default authorSlice.reducer;