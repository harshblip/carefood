// store.js
import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/notesSlice';
import authSlice from './slices/authSlice';
import signupSlice from './slices/signupSlice';

export default configureStore({
    reducer: {
        notes: notesReducer,
        auth: authSlice,
        signup: signupSlice,
    },
});
