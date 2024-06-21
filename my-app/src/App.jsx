// import { useState } from 'react'
import LoginForm from './scene/LoginForm'
import Home from './scene/Home'
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from './Redux/slices';
import {  Routes, Route } from "react-router-dom";
import Cart from './scene/Cart';
import Payment from './scene/Payment';
import {  db } from './firebaseConfig'
import { collection } from 'firebase/firestore';
import React from 'react';

import SignUpForm from './scene/SignUpForm';
import MyCourses from './scene/MyCourses';
import VideoPage from './scene/VideoPage';
import NoPage from './NoPage';



function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="/video/:courseId" element={<VideoPage />} />
        <Route path="*" element={<NoPage />} /> 
      </Routes>
    </>
  )
}

export default App
