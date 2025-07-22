import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    free_questions: [],
};

export const get_rank_0 = createAsyncThunk("question/rank/0", async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/question/rank/0`
    );
    return response.data.question;
});

export const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(get_rank_0.fulfilled, (state, action) => {
            state.free_questions = action.payload;
        });
    },
});

export default questionSlice.reducer;
