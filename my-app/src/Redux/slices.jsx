// coursesSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebaseConfig'; // Import the Firebase config instance
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    num: 0,
    purchasedCourses: {}, // Use an object to store purchased courses for multiple users
  },
  reducers: {
    addCourse: (state, action) => {
      const { name, className, url } = action.payload;
      const courseExists = state.courses.some(course => course.name === name);
      if (!courseExists) {
        const newCourse = {
          id: uuidv4(),
          name,
          className,
          url,
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
    resetCourses: (state) => {
      state.courses = [];
      state.num = 0;
    },
    purchaseCourses: async (state, action) => {
      const { uid, courses } = action.payload; // Receive uid and courses array
      // Update state
      state.purchasedCourses[uid] = courses;
      state.courses = [];
      state.num = 0;

      try {
        // Save purchased courses to Firestore under the user's document
        const userDocRef = doc(db, 'users', uid);
        await updateDoc(userDocRef, {
          purchasedCourses: courses
        });
      } catch (error) {
        console.error('Error updating purchased courses:', error);
        // Handle error as needed
      }
    },
    fetchPurchasedCourses: async (state, action) => {
      const { uid } = action.payload; // Receive uid
      try {
        // Fetch purchased courses from Firestore
        const userDocRef = doc(db, 'users', uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          state.purchasedCourses[uid] = userData.purchasedCourses || [];
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
        // Handle error as needed
      }
    },
  },
});

export const { addCourse, removeCourse, purchaseCourses, resetCourses, fetchPurchasedCourses } = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;
