// import { useState } from 'react'
import LoginForm from './scene/LoginForm'
import Home from './scene/Home'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from './Redux/slices';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from './scene/Cart';
import Payment from './scene/Payment';
import { app } from './firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


import SignUpForm from './scene/SignUpForm';
function App() {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.courses);
  const num = useSelector(state => state.courses.num);


  return (
    <>
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
