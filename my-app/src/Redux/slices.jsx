import { createSlice } from '@reduxjs/toolkit';
// import { v4 as uuidv4 } from 'uuid';
// import data from '../data/HomeData'



const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    num: 0,
    money: 0,
    purchasedCourses: [{
      name: 'Learn HTML in one course for free', id: 123,
    }],
  },
  reducers: {
    addCourse: (state, action) => {
      const { name, price } = action.payload;
      const courseExists = state.courses.some(course => course.name === name && course.price === price);

      if (!courseExists) {
        const newCourse = {
          // id: uuidv4(), // Generate unique ID
          ...action.payload,
        };
        state.courses.push(newCourse);
        state.num += 1;
      } else {
        console.log(`Course with name "${name}" already exists.`);
      }
    },
    removeCourse: (state, action) => {
      state.courses = state.courses.filter(course => course.id !== action.payload.id);
      state.num -= 1;
    },
    purchaseCourses: (state) => {

      if (state.courses.length > 0) {
        const totalCost = state.courses.reduce((acc, course) => acc + course.price, 0);

        if (state.money >= totalCost) {
          state.purchasedCourses.push(...state.courses);
          state.courses = [];
          state.num = 0;
          state.money -= totalCost;
          alert('Courses purchased successfully.');
        } else {
          alert('Insufficient funds to purchase all courses.');
        }
      }
    },
    addMoney: (state, action) => {
      state.money += action.payload;
    },
    buyCourse: (state, action) => {
      const course = action.payload;
      const courseExists = state.purchasedCourses.some(purchasedCourse => purchasedCourse.id === course.id);

      if (!courseExists && state.money >= course.price) {
        state.purchasedCourses.push(course);
        state.courses = state.courses.filter(c => c.id !== course.id);
        state.money -= course.price;
        state.num -= 1;

        alert(`Course with name "${course.name}" purchased successfully.`);
      } else if (courseExists) {
        alert(`Course with name "${course.name}" has already been purchased.`);
      } else {
        alert(`Insufficient funds to purchase "${course.name}".`);
      }
    },
  }
});

// Export actions and reducers
export const { addCourse, removeCourse, purchaseCourses, addMoney, buyCourse } = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;
