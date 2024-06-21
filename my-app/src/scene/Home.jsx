import React from 'react';
import Navbar from '../components/Navbar';
import { Box } from '@mui/material';

import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import data from './HomeData';
import "./Home.css";
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '../Redux/slices';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Home = (props) => {
  const { loading = false } = props;
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.courses);
  const [message, setMessage] = useState('');

  const handleAddCourse = (courseName, courseId, coursePrice) => {
    const courseExists = courses.some(course => course.name === courseName && course.price === coursePrice);
    if (courseExists) {
      setMessage(`Course with name "${courseName}" already exists.`);
    } else {
      dispatch(addCourse({ name: courseName, id: courseId, price: coursePrice }));
      setMessage('You have successfully bought a course!');
    }
  
    setTimeout(() => setMessage(''), 5000); // Clear the message after 5 seconds
  };



  return (
    <Box>
      <Navbar />
      {message && <div className={`message ${message.includes('exists') ? 'error' : 'success'}`}>{message}</div>}
      <Box m="20px">
        <Grid container spacing={2}>
          {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '100%', background: '#F8F9FA ' }}>
                {item ? (
                  <img
                    style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                    alt={item.title}
                    src={item.src}
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
                <button
                  onClick={() => handleAddCourse(item.title, item.id, item.price)}
                  className="custom-button"
                >
                  Add Course
                </button>
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
