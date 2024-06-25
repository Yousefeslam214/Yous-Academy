import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { coursesReducer } from './slices';

const rootReducer = combineReducers({
    courses: coursesReducer,

});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
