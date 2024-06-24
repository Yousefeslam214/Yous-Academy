import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/navbar/Navbar';
// import LoginForm from './components/login&sign/LoginForm';
// import SignUpForm from './components/login&sign/SignUpForm';
// import Cart from './components/cart/Cart';
// import Payment from './components/payment/Payment';
// import MyCourses from './components/myCourses/MyCourses';
// import VideoPage from './components/videoPage/VideoPage';
// import NoPage from './components/shared/noPage/NoPage';

// const Navbar = React.lazy(() => import('./components/shared/navbar/Navbar'));
const LoginForm = React.lazy(() => import('./components/login&sign/LoginForm'));
const SignUpForm = React.lazy(() => import('./components/login&sign/SignUpForm'));
const Home = React.lazy(() => import('./components/home/Home'));
const Payment = React.lazy(() => import('./components/payment/Payment'));
const MyCourses = React.lazy(() => import('./components/myCourses/MyCourses'));
const VideoPage = React.lazy(() => import('./components/videoPage/VideoPage'));
const Cart = React.lazy(() => import('./components/cart/Cart'));
const NoPage = React.lazy(() => import('./components/shared/noPage/NoPage'));

function App() {
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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
  );
}

export default App;
