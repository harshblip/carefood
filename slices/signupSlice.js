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
        isLoggedIn: false,
    },
    reducers: {
        updateForm: (state, action) => {
            state.formData[action.payload.field] = action.payload.value;
        },
        loginSuccess: (state) => {
            state.isLoggedIn = true;
        },
        loginFailure: (state) => {
            state.isLoggedIn = false;
        },
    }
});

export const { updateForm, loginSuccess, loginFailure } = signupSlice.actions;

export default signupSlice.reducer;
