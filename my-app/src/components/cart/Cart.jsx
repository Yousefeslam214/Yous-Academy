import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeCourse, buyCourse, purchaseCourses } from '../../Redux/slices';
import { Box, Typography, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import data from '../../data/HomeData';
import DeleteIcon from '@mui/icons-material/Delete';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector(state => state.courses.courses);
  const num = useSelector(state => state.courses.num);
  const money = useSelector(state => state.courses.money);

  const handlePurchase = () => {
    if (courses.length === 0) {
      alert('Please add courses to your cart before purchasing.');
      return;
    }
    dispatch(purchaseCourses());
  };

  const handleCourseAction = (course, action) => {
    dispatch(action(course));
  };

  const goToMyCourses = () => {
    navigate('/mycourses');
  };

  const getImageUrlForId = (id) => {
    const course = data.find(course => course.id === id);
    return course ? course.src : '';
  };


  return (
    <Box className='container'>
      <Typography variant="h4" className='textLarge'>Number of courses in your cart: {num}</Typography>
      <Typography variant="h4" className='textLarge'>Available balance: ${money}</Typography>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Box>
        <Typography variant="h4" gutterBottom className='textLarge'>Your Courses:</Typography>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Box key={course.id} className='textSmall course-item'>
              <Box className='course-image'>
                <img src={getImageUrlForId(course.id)} alt={course.name} style={{ width: '100%', height: 'auto' }} className='imgCart' />
              </Box>
              <Typography variant="h6" className='course-name textSmall'>
                {course.name}
              </Typography>
              <Typography variant="body1" className='textSmall'>${course.price}</Typography>
              <Button variant="contained" color="primary" onClick={() => handleCourseAction(course, buyCourse)} className='btn-small-text'>Buy</Button>
              <Link to="/" className='no-link-style'>
                <Button variant="contained" color="primary" className='no'>View Course</Button>
              </Link>
              <Link >
                <DeleteIcon className='textLarge delete-icon' onClick={() => handleCourseAction(course, removeCourse)} />
              </Link>
            </Box>
          ))
        ) : (
          <Typography variant="body1" className='textSmall'>No courses added to your cart yet.</Typography>
        )}
        <Box className='purchase-button-container'>
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePurchase}
            disabled={courses.length === 0}
            sx={{ backgroundColor: "#3DC2EC", color: '#FFFFFF' }}
            className='btn-small-text purchase-button'
          >
            Purchase All Courses
          </Button>
        </Box>
      </Box>
      <Divider sx={{ mt: 3, mb: 3 }} />
      <Button
        variant="contained"
        color="secondary"
        onClick={goToMyCourses}
        className='btn-small-text go-to-courses-button'
      >
        Go to Your Courses
      </Button>
    </Box>
  );
};

export default Cart;
