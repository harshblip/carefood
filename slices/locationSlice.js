import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        city: '',
        x: 0,
        y: 0,
        restId: 0
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
        },
        storeRestId: (state, action) => {
            const { id } = action.payload;
            state.restId = id;
        }
    }
})

export const { storeCity, storeCoord, storeRestId } = locationSlice.actions;
export default locationSlice.reducer
