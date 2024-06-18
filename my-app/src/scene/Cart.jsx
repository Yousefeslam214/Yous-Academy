import React from 'react';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse, removeCourse, purchaseCourses } from '../Redux/slices';
import { Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Ensure correct path

const Cart = () => {
    const dispatch = useDispatch();
    const courses = useSelector(state => state.courses.courses);
    const num = useSelector(state => state.courses.num);

    const handleAddValidCourse = () => {
        const courseValid = {
            id: uuidv4(),
            name: 'Valid Course',
            className: 'valid',
        };
        dispatch(addCourse(courseValid));
    };

    const amount = 100; // Example amount, replace with actual amount

    // const handlePurchase = async () => {
    //     const user = auth.currentUser;
    //     if (user) {
    //         const uid = user.uid;
    //         dispatch(purchaseCourses({ uid, amount }));
    //     } else {
    //         console.log('User is not authenticated');
    //     }
    // };
    // console.log(courses)
    const handlePurchase = async () => {
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            dispatch(purchaseCourses({ uid, amount }));
        } else {
            console.log('User is not authenticated');
        }
    };
    return (
        <Box>
            <Navbar />
            <Box m="20px">
                <h1>Num of courses is : {num}</h1>
                <div>
                    <h2>Courses list :</h2>
                    <ul>
                        {courses.map(course => (
                            <div key={course.id}>
                                <li>{course.name}</li>
                                <button onClick={() => dispatch(removeCourse({ id: course.id, name: course.name }))}>
                                    Remove Course
                                </button>
                            </div>
                        ))}
                    </ul>
                    <button onClick={() => dispatch(addCourse({ id: uuidv4(), name: 'React' }))}>Add Course</button>
                </div>
                <Box bgcolor="#000000">
                    <button onClick={handleAddValidCourse}>Add Valid Course</button>
                </Box>
                <Box mt="20px">
                    <button onClick={handlePurchase}>Purchase Courses</button>
                </Box>
                <Box>
                    <Typography variant="h4" gutterBottom>Available Courses</Typography>
                    {courses.map(course => (
                        <Box key={course.id} sx={{ marginBottom: 2 }}>
                            <Typography variant="h6" className={course.className}>
                                {course.name}
                            </Typography>
                            <Link to={course.url} style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary">
                                    View Course
                                </Button>
                            </Link>
                        </Box>
                    ))}
                    <Button variant="contained" color="secondary" onClick={handlePurchase}>
                        Purchase Courses
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Cart;
