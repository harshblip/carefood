import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState: {
        restId: 0,
        amount: 0,
        restName: '',
        orderId: 0
    },
    reducers: {
        storeRestId: (state, action) => {
            const { id } = action.payload;
            state.restId = id;
        },
        storeAmount: (state, action) => {
            const { amm, name } = action.payload;
            state.amount = amm
            state.restName = name
        },
        storeOrderid: (state, action) => {
            const { id } = action.payload;
            state.orderId = id
        }
    }
})

export const {
    storeRestId, storeAmount, storeOrderid
} = restaurantSlice.actions

export default restaurantSlice.reducer