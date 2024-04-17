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
        userId: '',
        isLoggedIn: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            const { email, isLoggedIn, name, userId } = action.payload;
            state.email = email;
            state.isLoggedIn = isLoggedIn;
            state.name = name;
            state.userId = userId;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.email = ''; // Reset email state on logout
            state.name = '';
            state.userId = '';
        },
    }
});

export const { updateForm, loginSuccess, loginFailure, logout } = signupSlice.actions;

export default signupSlice.reducer;
