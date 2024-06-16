import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    amount: 6,
    total: 0,
    isLoading: true,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        }
    }
})

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
