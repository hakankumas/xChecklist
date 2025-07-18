import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile/profileSlice";
import questionReducer from "../features/question/questionSlice";

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        question: questionReducer,
    },
});
