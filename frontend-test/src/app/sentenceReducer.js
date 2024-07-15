import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    sentences: [],
    loading: false,
    error: null,
};

export const fetchSentences = createAsyncThunk(
    'sentence/fetchSentence',
    async()=>{
        const res = await axios.get('/data.json').then((response)=>
            response.data
        )
        return res;
    }
)


const sentenceSlice = createSlice({
    name: "sentence",
    initialState,
    reducers: {
        updateSentences: (state, action) => {
            const changedSentence = action.payload;
            const index = state.sentences.findIndex((el) => el.id === changedSentence.id);
            if (index !== -1) {
                state.sentences[index] = changedSentence;
            }
        },
        addSentence: (state, action) => {
            const newSentence = action.payload;
            state.sentences.push(newSentence)
        },
        deleteSentence: (state, action) => {
            const chosenId = action.payload;
            state.sentences = state.sentences.filter((el)=> el.id !== chosenId);
        },
        changeSentences: (state, action) => {
            const newSentences = action.payload;
            state.sentences = newSentences;
        }   
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchSentences.pending,(state) => {
                state.loading = true;
                state.error = null; 
            })
            .addCase(fetchSentences.fulfilled, (state, action)=> {
                state.loading = false;
                state.sentences = action.payload;
            })
            .addCase(fetchSentences.rejected, (state,action) => {
                state.loading = false;
                state.error = action.error.message;
                console.error('Error fetching sentences:', action.error.message);
            })
    }
})

export const {updateSentences, addSentence, deleteSentence, changeSentences} = sentenceSlice.actions;
export default sentenceSlice.reducer;