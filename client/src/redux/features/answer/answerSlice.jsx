import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    answers: [],
    group0: [],
    group1: [],
    group2: [],
};

export const getall_answer = createAsyncThunk(
    "answer/getall/:profile_id",
    async (profile_id) => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/answer/getall/${profile_id}`
        );
        return response.data.answer;
    }
);

export const remove_answer = createAsyncThunk(
    "answer/remove",
    async (condition) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/answer/remove`,
            condition
        );
        return response.data.answer;
    }
);
export const answerSlice = createSlice({
    name: "answer",
    initialState,
    reducers: {
        split_group: (state, action) => {
            state.group0 = state.answers.filter((answer) => answer.rank === 0);
            state.group1 = state.answers.filter((answer) => answer.rank === 1);
            state.group2 = state.answers.filter((answer) => answer.rank === 2);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getall_answer.fulfilled, (state, action) => {
                state.answers = action.payload;
            })
            .addCase(remove_answer.fulfilled, (state, action) => {
                state.answers = state.answers.filter(
                    (answer) => answer.id !== action.payload.id
                );
            });
    },
});

export const { split_group } = answerSlice.actions;
export default answerSlice.reducer;
