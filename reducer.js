import { combineReducers } from '@reduxjs/toolkit';
import signupReducer from './slices/signupSlice';
import locationReducer from './slices/locationSlice';

const rootReducer = combineReducers({
    signup: signupReducer,
    location: locationReducer
});

export default rootReducer;
