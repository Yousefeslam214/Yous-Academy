import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    num: 0
  },
  reducers: {
    addCourse: (state, action) => {
      const { name } = action.payload;
      const courseExists = state.courses.some(course => course.name === name);
      if (!courseExists) {
        const newCourse = {
          id: uuidv4(), // Generate unique ID
          ...action.payload,
        };
        state.courses.push(newCourse);
        state.num = state.num + 1;
      } else {
        console.log(`Course with name "${name}" already exists.`);
      }
    },
    removeCourse: (state, action) => {
      state.courses = state.courses.filter(course => course.id !== action.payload.id);
      state.num = state.num - 1;
    },
  }
});

// Export actions and reducers
export const { addCourse, removeCourse } = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;
