// import { useState } from 'react'

import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import {  addCourse, removeCourse } from '../Redux/slices';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';




const Cart = () => {
    const dispatch = useDispatch();
    const courses = useSelector(state => state.courses.courses);
    const num = useSelector(state => state.courses.num);

    return (
        <Box>
        <Navbar/>

            <Box m="20px">

                <h1>Num of courses is : {num}</h1>

                <div>

                    <h2>Courses list :</h2>
                    <ul>
                        {courses.map(course => {
                            {/* console.log(uuidv4()); // Log each course object
                        course.id = uuidv4() */}
                            console.log(course); // Log each course object

                            return (
                                <div key={course.id}>
                                    <li>{course.name}</li>
                                    <button onClick={() => dispatch(removeCourse({ id: course.id, name: course.name }))}>
                                        Remove Course
                                    </button>
                                </div>
                            );
                        })}
                    </ul>

                    <button onClick={() => dispatch(addCourse({ id: uuidv4(), name: 'React' }))}>Add Course</button>
                </div>
            </Box>
        </Box>
    )
}

export default Cart

