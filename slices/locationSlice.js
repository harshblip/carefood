import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        city: '',
        x: 0,
        y: 0,
    },
    reducers: {
        storeCity: (state, action) => {
            const { city } = action.payload;
            state.city = city;
        },
        storeCoord: (state, action) => {
            const { x, y } = action.payload;
            state.x = x;
            state.y = y;
        }
    }
})

export const { storeCity, storeCoord } = locationSlice.actions;
export default locationSlice.reducer
