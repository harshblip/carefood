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
        name: '',
        isLoggedIn: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            const { email, isLoggedIn, name } = action.payload;
            state.email = email;
            state.isLoggedIn = isLoggedIn;
            state.name = name;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.email = ''; // Reset email state on logout
            state.name = '';
        },
    }
});

export const { updateForm, loginSuccess, loginFailure, logout } = signupSlice.actions;

export default signupSlice.reducer;
