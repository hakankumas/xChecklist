import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    questions: [],
    my_questions: [],
};

export const getall_question = createAsyncThunk("question/getall", async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/question/getall`
    );
    return response.data.question;
});

export const getbyid_question = createAsyncThunk("question/get", async (id) => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/question/${id}`
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

export const update_question = createAsyncThunk(
    "question/update",
    async (condition) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/question/update`,
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
    reducers: {
        split_my_questions: (state, action) => {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(getall_question.fulfilled, (state, action) => {
                state.questions = action.payload;
            })
            .addCase(create_question.fulfilled, (state, action) => {
                state.questions = [...state.questions, action.payload];
            })
            .addCase(update_question.fulfilled, (state, action) => {
                state.questions = state.questions.map((question) =>
                    question.id === action.payload.id
                        ? action.payload
                        : question
                );
            })
            .addCase(delete_question.fulfilled, (state, action) => {
                state.questions = state.questions.filter(
                    (question) => question.id !== action.payload.id
                );
            });
    },
});

export const { split_my_questions } = questionSlice.actions;
export default questionSlice.reducer;
