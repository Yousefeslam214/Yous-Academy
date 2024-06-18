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

  const handleAddCourse = (courseName, courseId) => {
    const courseExists = courses.some(course => course.name === courseName);

    if (courseExists) {
      setMessage(`Course with name "${courseName}" already exists.`);
    } else {
      dispatch(addCourse({ name: courseName, id: courseId }));
      setMessage('You have successfully bought a course!');
    }

    setTimeout(() => setMessage(''), 5000); // Clear the message after 5 seconds
  };

  return (
    <Box>
      <Navbar />
      {message && <div className={`message ${message.includes('exists') ? 'error' : 'success'}`}>{message}</div>}
      <Box m="20px">
        <Grid container wrap="nowrap">
          {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
            <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
              {item ? (
                <img
                  style={{ width: 210, height: 118 }}
                  alt={item.title}
                  src={item.src}
                />
              ) : (
                <Skeleton variant="rectangular" width={210} height={118} />
              )}
              {item ? (
                <Box sx={{ pr: 2 }}>
                  <Typography gutterBottom variant="body2">
                    {item.title}
                  </Typography>
                  <Typography display="block" variant="caption" color="text.secondary">
                    {item.channel}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {`${item.views} • ${item.createdAt}`}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              )}
              <button onClick={() => handleAddCourse(item.title, uuidv4())}>Add Course</button>
            </Box>
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
