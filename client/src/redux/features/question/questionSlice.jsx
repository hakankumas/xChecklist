import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    all_questions: [],
    free_questions: [],
};

export const get_rank_0 = createAsyncThunk("question/rank/0", async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/question/rank/0`
    );
    return response.data.question;
});

export const getall_question = createAsyncThunk("question/getall", async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/question/getall`
    );
    return response.data.question;
});

export const create_question = createAsyncThunk(
    "question/create",
    async (condition) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/question/create`,
            condition
        );
        return response.data.question;
    }
);

export const delete_question = createAsyncThunk(
    "question/delete",
    async (id) => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/question/delete/${id}`
        );
        return response.data.question;
    }
);

export const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(get_rank_0.fulfilled, (state, action) => {
                state.free_questions = action.payload;
            })
            .addCase(getall_question.fulfilled, (state, action) => {
                state.all_questions = action.payload;
            })
            .addCase(create_question.fulfilled, (state, action) => {
                state.all_questions = [...state.all_questions, action.payload];
            })
            .addCase(delete_question.fulfilled, (state, action) => {
                state.all_questions = state.all_questions.filter(
                    (question) => question.id !== action.payload.id
                );
            });
    },
});

export default questionSlice.reducer;
