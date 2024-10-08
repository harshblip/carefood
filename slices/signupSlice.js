import { createSlice } from "@reduxjs/toolkit";

const signupSlice = createSlice({
    name: 'signup',
    initialState: {
        email: '',
        name: '',
        userId: '',
        accessToken: '',
        isLoggedIn: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            const { email, isLoggedIn, name, accessToken } = action.payload;
            state.email = email;
            state.isLoggedIn = isLoggedIn;
            state.name = name;
            state.accessToken = accessToken;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.email = '';
            state.name = '';
            state.accessToken = '';
        },
        signupSuccess: (state, action) => {
            const { userId } = action.payload;
            state.userId = userId;
        }
    }
});

export const { updateForm, loginSuccess, loginFailure, logout, signupSuccess } = signupSlice.actions;

export default signupSlice.reducer;
