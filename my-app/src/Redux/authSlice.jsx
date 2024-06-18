// authSlice.js (Redux slice for authentication)
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null, // Initialize user state
        // Add other authentication-related states as needed
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        // Add other reducers as needed
    },
});

export const { setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
