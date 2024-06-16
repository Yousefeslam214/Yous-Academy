// reducers.js

import { INCREMENT, DECREMENT, ADD_COURSE, REMOVE_COURSE, UPDATE_COURSE } from './actions';

// Initial State
const initialState = {
    count: 0,
    courses: [],
};


// Reducer
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1,

            };
        case DECREMENT:
            return {
                ...state,
                count: state.count - 1,
            };
        default:
            return state;
    }
};
const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COURSE:
            return {
                ...state,
                courses: [...state.courses, action.payload],
            };
        case REMOVE_COURSE:
            return {
                ...state,
                courses: state.courses.filter(course => course.id !== action.payload),
            };
        case UPDATE_COURSE:
            return {
                ...state,
                courses: state.courses.map(course =>
                    course.id === action.payload.id ? action.payload : course
                ),
            };
        default:
            return state;
    }
};
export default counterReducer;
export { counterReducer, courseReducer };
