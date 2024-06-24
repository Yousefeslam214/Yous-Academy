import LoginForm from './components/login&sign/LoginForm'
import Home from './components/home/Home'
import { Routes, Route } from "react-router-dom";
import Cart from './components/cart/Cart';
import Payment from './components/payment/Payment';
import React from 'react';
import SignUpForm from './components/login&sign/SignUpForm';
import MyCourses from './components/myCourses/MyCourses';
import VideoPage from './components/videoPage/VideoPage';
import NoPage from './components/shared/noPage/NoPage';


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
