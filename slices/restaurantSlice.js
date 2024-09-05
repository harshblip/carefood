import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState: {
        restId: 0,
        amount: 0,
        restName: '',
        orderId: 0,
        address: '',
        orders: []
    },
    reducers: {
        storeRestId: (state, action) => {
            const { id, address } = action.payload;
            state.restId = id;
            state.address = address
        },
        storeOrder: (state, action) => {
            const { id, amm, name, orders } = action.payload;
            state.orderId = id
            state.amount = amm
            state.restName = name
            state.orders = orders
        }
    }
})

export const {
    storeRestId, storeOrder
} = restaurantSlice.actions

export default restaurantSlice.reducer