import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    answers: [],
    answers2: [],
};

export const getall_answer = createAsyncThunk(
    "answer/getall/:profile_id/:rank",
    async ({ profile_id, rank }) => {
        const response = await axios.get(
            `${
                import.meta.env.VITE_API_URL
            }/answer/getall/${profile_id}/${rank}`
        );
        return response.data.answer;
    }
);

export const create_answer = createAsyncThunk(
    "answer/create",
    async (condition) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/answer/create`,
            condition
        );
        return response.data.answer;
    }
);

export const delete_answer = createAsyncThunk("answer/delete", async (id) => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/answer/delete/${id}`
    );
    return response.data.answer;
});

export const getall_answer2 = createAsyncThunk(
    "answer2/getall/:profile_id",
    async ({ profile_id }) => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/answer/getall/${profile_id}`
        );
        return response.data.answer;
    }
);

export const create_answer2 = createAsyncThunk(
    "answer2/create",
    async (condition) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/answer/create`,
            condition
        );
        return response.data.answer;
    }
);

export const delete_answer2 = createAsyncThunk("answer2/delete", async (id) => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/answer/delete/${id}`
    );
    return response.data.answer;
});

export const answerSlice = createSlice({
    name: "answer",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getall_answer.fulfilled, (state, action) => {
                state.answers = action.payload;
            })
            .addCase(create_answer.fulfilled, (state, action) => {
                state.answers = [...state.answers, action.payload];
            })
            .addCase(delete_answer.fulfilled, (state, action) => {
                state.answers = state.answers.filter(
                    (answer) => answer.id !== action.payload.id
                );
            })
            .addCase(getall_answer2.fulfilled, (state, action) => {
                state.answers2 = action.payload.filter(
                    (item) => item.rank !== 0
                );
            })
            .addCase(create_answer2.fulfilled, (state, action) => {
                state.answers2 = [...state.answers2, action.payload];
            })
            .addCase(delete_answer2.fulfilled, (state, action) => {
                state.answers2 = state.answers2.filter(
                    (answer2) => answer2.id !== action.payload.id
                );
            });
    },
});

export default answerSlice.reducer;
