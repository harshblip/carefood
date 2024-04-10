import { combineReducers } from '@reduxjs/toolkit';
import signupReducer from './slices/signupSlice';

const rootReducer = combineReducers({
    signup: signupReducer,
});

export default rootReducer;
