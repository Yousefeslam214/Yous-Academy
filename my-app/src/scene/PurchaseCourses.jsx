import { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
// import { fetchPurchasedCourses } from '../Redux/slices'; // Adjust the path as per your project structure

const PurchaseCourses = () => {
    const dispatch = useDispatch();
    const purchaseCourses = useSelector(state => state.courses.purchasedCourses);
    // const currentUser = useSelector(state => state.auth.user); // Assuming you have authentication state

    // useEffect(() => {
    //     if (currentUser) {
    //         // Fetch purchased courses when component mounts
    //         dispatch(fetchPurchasedCourses({ uid: currentUser.uid }));
    //     }
    // }, [currentUser, dispatch]);
    // useEffect(() => {
    //     // Fetch purchased courses when component mounts
    //     // Replace with actual user UID from Firebase Authentication
    //     const uid = 'user_uid_from_auth'; // Replace with actual user UID
    //     dispatch(fetchPurchasedCourses({ uid }));
    // }, [dispatch]);

    return (
        <Box>
            <Navbar />
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" gutterBottom>Purchased Courses</Typography>
                {purchaseCourses.length > 0 ? (
                    purchaseCourses.map(course => (
                        <Box key={course.id} sx={{ marginBottom: 2 }}>
                            <Typography variant="h6" className={course.className}>
                                {course.name}
                            </Typography>
                            <Link to={course.url} style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary">
                                    Go to Course
                                </Button>
                            </Link>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body1">You have not purchased any courses yet.</Typography>
                )}
            </Box>
        </Box>
    );
}

export default PurchaseCourses;
