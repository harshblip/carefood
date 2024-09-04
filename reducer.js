import { combineReducers } from '@reduxjs/toolkit';
import signupReducer from './slices/signupSlice';
import locationReducer from './slices/locationSlice';
import restaurantReducer from './slices/restaurantSlice'

const rootReducer = combineReducers({
    signup: signupReducer,
    location: locationReducer,
    restaurants: restaurantReducer
});

export default rootReducer;
