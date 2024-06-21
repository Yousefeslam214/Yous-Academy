import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse, purchaseCourses, addMoney, buyCourse } from '../Redux/slices';
import { Box, Typography, Button, Divider } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

// Example: Course title to image URL mapping
const titleToImage = {
    'Learn HTML in one course': 'https://www.oxfordwebstudio.com/user/pages/06.da-li-znate/sta-je-html/sta-je-html.jpg',
    'Learn CSS in one course': 'https://blog.twiintech.com/wp-content/uploads/2022/12/sta-je-css.jpg',
    'Learn JS in one course': 'https://www.macworld.com/wp-content/uploads/2023/01/learn_javascript_on_mac.jpg?quality=50&strip=all',
    'Learn React in one course': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCrrN5uAYF6jGsgtPSJAGBYPjsrQ4ADb5Xeg&s',
    'Learn Angular in one course': 'https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-11/angular-logo-1200-628.png?sfvrsn=bf64b1ee_3',
    'Learn Vue in one course': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpfE8WGNRdD_70vw7LwEQHv9hGQftrqYXS7w&s',
};

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const courses = useSelector(state => state.courses.courses);
    const num = useSelector(state => state.courses.num);
    const money = useSelector(state => state.courses.money);

    const handleAddValidCourse = () => {
        const courseValid = {
            id: uuidv4(),
            name: 'Valid Course',
            className: 'valid',
            price: 50 // Add a price for demonstration
        };
        dispatch(addCourse(courseValid));
    };

    const handlePurchase = () => {
        if (courses.length === 0) {
            alert('Please add courses to your cart before purchasing.');
            return;
        }
        dispatch(purchaseCourses());
        alert('Courses purchased successfully!');
    };

    const handleAddMoney = (amount) => {
        dispatch(addMoney(amount));
    };

    const handleBuyCourse = (course) => {
        dispatch(buyCourse(course));
    };

    const goToMyCourses = () => {
        navigate('/mycourses');
    };

    const getImageUrlForTitle = (title) => {
        return titleToImage[title] || 'https://placeholder.com/placeholder.jpg'; // Replace with a default image URL if title not found
    };

    return (
        <Box>
            <Navbar />
            <Box m="20px">
                <Typography variant="h4">Number of courses in your cart: {num}</Typography>
                <Typography variant="h4">Available balance: ${money}</Typography>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Box>
                    <Typography variant="h4" gutterBottom>Your Courses:</Typography>
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <Box key={course.id} sx={{ marginBottom: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Box sx={{ width: '100px', height: 'auto' }}>
                                    <img src={getImageUrlForTitle(course.name)} alt={course.name} style={{ width: '100%', height: 'auto' }} />
                                </Box>
                                <Typography variant="h6" className={course.className}>
                                    {course.name}
                                </Typography>
                                <Typography variant="body1">${course.price}</Typography>
                                <Button variant="contained" color="primary" onClick={() => handleBuyCourse(course)}>Buy</Button>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="primary">View Course</Button>
                                </Link>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body1">No courses added to your cart yet.</Typography>
                    )}
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handlePurchase}
                            disabled={courses.length === 0}
                            sx={{ backgroundColor: "#3DC2EC", color: '#FFFFFF' }}
                        >
                            Purchase All Courses
                        </Button>
                    </Box>
                </Box>
                <Divider sx={{ mt: 3, mb: 0 }} />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={goToMyCourses}
                    sx={{ backgroundColor: "#3DC2EC", marginTop: "35px", color: '#FFFFFF' }}
                >
                    Go to Your Courses
                </Button>
            </Box>
        </Box>
    );
};

export default Cart;
