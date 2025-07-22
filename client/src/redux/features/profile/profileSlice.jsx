import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    new_profiles: [],
};

export const createProfile = createAsyncThunk(
    "profile/create",
    async (condition) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/profile/create`,
            condition
        );
        return response.data.profile;
    }
);

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createProfile.fulfilled, (state, action) => {
            state.new_profiles = [action.payload];
        });
    },
});

export default profileSlice.reducer;
