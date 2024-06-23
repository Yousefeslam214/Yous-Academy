import { Box, Grid, Typography, Skeleton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '../../Redux/slices';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import data from '../../data/HomeData';
import "./Home.css";

const Home = ({ loading = false }) => {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.purchasedCourses);
  const existsOnCourses = useSelector(state => state.courses.courses);

  const [message, setMessage] = useState('');

  const handleAddCourse = (courseName, courseId, coursePrice) => {
    if (existsOnCourses.some(course => course.name === courseName)) {
      setMessage(`Course with name "${courseName}" already exists.`);
    } else {
      dispatch(addCourse({ name: courseName, id: courseId, price: coursePrice }));
      setMessage('You have successfully bought a course!');
    }
    setTimeout(() => setMessage(''), 5000);
  };

  return (
      <Box className="container">
      {message && <div className={`message ${message.includes('exists') ? 'error' : 'success'}`}>{message}</div>}
        <Grid container spacing={2}>
          {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Box className="course-card">
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
                {item ? (
                  courses.some(course => course.name === item.title) ? (
                    <Link to={`/video/${item.id}`} className="custom-button-link">
                      <button className="custom-button">Open Course</button>
                    </Link>
                  ) : (
                    <button
                      className="custom-button"
                      onClick={() => handleAddCourse(item.title, item.id, item.price)}
                    >
                      Add Course
                    </button>
                  )
                ) : (
                  <Box sx={{ textAlign: 'center', pt: 1 }}>
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
  );
};

Home.propTypes = {
  loading: PropTypes.bool,
};

export default Home;
