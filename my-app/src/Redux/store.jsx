// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {  coursesReducer } from './slices';
import { authReducer } from './authSlice'; // Adjust the path as per your actual file structure

const rootReducer = combineReducers({
    courses: coursesReducer,
    auth: authReducer,

});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
