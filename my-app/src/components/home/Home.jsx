import { Box, Grid, Typography, Skeleton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '../../Redux/slices';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../shared/navbar/Navbar';
import data from '../../data/HomeData';
import "./Home.css";

const Home = (props) => {
    const { loading = false } = props;
    const dispatch = useDispatch();
    const courses = useSelector(state => state.courses.purchasedCourses);
    // const courseExists = courses.some(course => course.name === courseName && course.price === coursePrice);

    const [message, setMessage] = useState('');
    // const courses = useSelector(state => state.courses.courses);

    const courseExistsonCourses = useSelector(state => state.courses.courses);
    const handleAddCourse = (courseName, courseId, coursePrice) => {
        const courseExists = courseExistsonCourses.some(course => course.name === courseName);

        if (courseExists) {
            setMessage(`Course with name "${courseName}" already exists.`);
        } else {
            dispatch(addCourse({ name: courseName, id: courseId, price: coursePrice }));
            setMessage('You have successfully bought a course!');
        }
        setTimeout(() => setMessage(''), 5000);
    };

    return (
        <Box>
            <Navbar />
            {message && <div className={`message ${message.includes('exists') ? 'error' : 'success'}`}>{message}</div>}
            <Box className="container">
                <Grid container spacing={2}>
                    {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '100%', background: '#F8F9FA ' }}>
                                {item ? (
                                    <img
                                        style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                                        alt={item.title}
                                        src={item.src}
                                        // loading={item.title === "Learn CSS in one course" ? "eager" : "lazy"}
                                        loading="lazy"
                                        width="400"
                                        srcSet={`${item.title} 400w, ${item.title} 800w`}

                                        height="300"
                                    />
                                ) : (
                                    <Skeleton variant="rectangular" width="100%" height="118px" />
                                )}
                                {item ? (
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography gutterBottom variant="body2" sx={{ fontWeight: 'bold', m: 0 }}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {item.channel}
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Box sx={{ textAlign: 'center', pt: 1 }}>
                                        <Skeleton />
                                        <Skeleton width="60%" />
                                    </Box>
                                )}
                                {/* Custom styled button */}
                                {courses.some(course => course.name === item.title) ? (
                                    <Link to={`/video/${item.id}`} style={{ textDecoration: 'none' }}>
                                        <button className="custom-button">Open Course</button>
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => handleAddCourse(item.title, item.id, item.price)}
                                        className="custom-button"
                                    >
                                        Add Course
                                    </button>
                                )}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

Home.propTypes = {
    loading: PropTypes.bool,
};

export default Home;
