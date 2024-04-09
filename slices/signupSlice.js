import { createSlice } from "@reduxjs/toolkit";

const signupSlice = createSlice({
    name: 'signup',
    initialState: {
        formData: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            city: '',
            phoneNumber: '',
            funFood: '',
        },
        email: '',
        isLoggedIn: false,
    },
    reducers: {
        updateForm: (state, action) => {
            state.formData[action.payload.field] = action.payload.value;
        },
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.email = action.payload.email;
        },
        loginFailure: (state) => {
            state.isLoggedIn = false;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.email = ''; // Reset email state on logout
        },
    }
});

export const { updateForm, loginSuccess, loginFailure, logout } = signupSlice.actions;

export default signupSlice.reducer;
