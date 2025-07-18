import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    profiles: [],
    selected_profile: [],
};

export const getAllProfile = createAsyncThunk("profile/getall", async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/profile/getall`
    );
    return response.data.profile;
});

export const getProfile = createAsyncThunk("profile/get", async (id) => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/profile/${id}`
    );
    return response.data.profile;
});

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

export const updateProfile = createAsyncThunk(
    "profile/update",
    async (condition) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/profile/update`,
            condition
        );
        return response.data.profile;
    }
);

export const deleteProfile = createAsyncThunk("profile/delete", async (id) => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/profile/delete/${id}`
    );
    return response.data.profile;
});

export const updateProfileStepNo = createAsyncThunk(
    "profile/update/stepno",
    async (condition) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/profile/update/stepno`,
            condition
        );
        return response.data.profile;
    }
);

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        emptySelectedProfile: (state) => {
            state.selected_profile = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProfile.fulfilled, (state, action) => {
                state.profiles = action.payload;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.selected_profile = action.payload;
            })
            .addCase(createProfile.fulfilled, (state, action) => {
                state.profiles = [...state.profiles, action.payload];
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.profiles = state.profiles.map((profile) =>
                    profile.id === action.payload.id ? action.payload : profile
                );
            })
            .addCase(deleteProfile.fulfilled, (state, action) => {
                state.profiles = state.profiles.filter(
                    (profile) => profile.id !== action.payload.id
                );
            })
            .addCase(updateProfileStepNo.fulfilled, (state, action) => {
                console.log(action.payload);
            });
    },
});

export const { emptySelectedProfile } = profileSlice.actions;
export default profileSlice.reducer;
