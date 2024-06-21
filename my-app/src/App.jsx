// import { useState } from 'react'
import LoginForm from './scene/LoginForm'
import Home from './scene/Home'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from './Redux/slices';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from './scene/Cart';
import Payment from './scene/Payment';
import { app, db } from './firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
// const collectionRef = collection(db, 'users')
import React from 'react';
// import { useDispatch } from 'react-redux';
// import { addCourse } from './Redux/slices';

import SignUpForm from './scene/SignUpForm';
import PurchaseCourses from './scene/PurchaseCourses';
import VideoPage from './scene/VideoPage';



function App() {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.courses);
  const num = useSelector(state => state.courses.num);

  const collectionRef = collection(db, 'users')
  // const dispatch = useDispatch();

  const handleAddCourse = () => {
    const course = {
      name: 'Math 101',
      className: '',
      // url: '/courses/math-101' // Add course URL here
    };


    dispatch(addCourse(course));
  }
  const handleAddValidCourse = () => {
    const courseValid = {
      // name: 'Math 101',
      className: 'valid',
      // url: '/courses/math-101' // Add course URL here
    };
    dispatch(addCourse(courseValid));
  };

  return (
    <>
      {/* <div>
        <button onClick={handleAddCourse}>Add Course</button>
      </div>
      <div>
        <button onClick={handleAddValidCourse}>handleAddValidCourse</button>
      </div> */}

      {/* <Navbar /> */}
      {/* <h1>{num }</h1> */}


      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/mycourses" element={<PurchaseCourses />} />
        <Route path="/video/:courseId" element={<VideoPage />} />
        {/* <Route path="*" element={<NoPage />} />  */}
        {/* </Route> */}
      </Routes>
      {/* <div>
        <h1>Count: {count}</h1>

        <h2>Courses</h2>
        <ul>
          {courses.map(course => (
            <li key={course.id}>{course.name}</li>
          ))}
        </ul>
        
        <button onClick={() => dispatch(addCourse({ id: 1, name: 'React' }))}>Add Course</button>
      </div> */}
    </>
  )
}

export default App
