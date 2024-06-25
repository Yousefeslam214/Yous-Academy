import { Routes, Route } from "react-router-dom";
import React, { Suspense } from 'react';

import SignUpForm from './components/login&sign/SignUpForm';
import Home from './components/home/Home'
import Loading from "./components/loading/Loading";
const LoginForm = React.lazy(() => import('./components/login&sign/LoginForm'));
const Payment = React.lazy(() => import('./components/payment/Payment'));
const MyCourses = React.lazy(() => import('./components/myCourses/MyCourses'));
const VideoPage = React.lazy(() => import('./components/videoPage/VideoPage'));
const Cart = React.lazy(() => import('./components/cart/Cart'));
const NoPage = React.lazy(() => import('./components/shared/noPage/NoPage'));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </>
  )
}

export default App
