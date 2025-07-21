import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile/profileSlice";
import questionReducer from "../features/question/questionSlice";
import answerReducer from "../features/answer/answerSlice";

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        question: questionReducer,
        answer: answerReducer,
    },
});
