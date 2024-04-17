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
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.email = ''; // Reset email state on logout
            state.name = '';
        },
        signupSuccess: (state, action) => {
            const { userId } = action.payload;
            state.userId = userId;
        }
    }
});

export const { updateForm, loginSuccess, loginFailure, logout, signupSuccess } = signupSlice.actions;

export default signupSlice.reducer;
