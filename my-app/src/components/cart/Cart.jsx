import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { purchaseCourses, removeCourse, buyCourse } from '../../Redux/slices';
import { Box, Typography, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import data from '../../data/HomeData';
import './Cart.css'
import DeleteIcon from '@mui/icons-material/Delete';

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
  const handleRemove = (course) => {

    dispatch(removeCourse(course));
  };

  const handleBuyCourse = (course) => {
    dispatch(buyCourse(course));
  };

  const goToMyCourses = () => {
    navigate('/mycourses');
  };

  const getImageUrlForId = (id) => {
    const course = data.find(courses => courses.id === id);
    return course ? course.src : 'https://placeholder.com/placeholder.jpg'; // Replace with a default image URL if title not found
  };

  return (
    <Box>
      <Navbar />
      <Box className='container'>
        <Typography variant="h4" className='textLarge'>Number of courses in your cart: {num}</Typography>
        <Typography variant="h4" className='textLarge'>Available balance: ${money}</Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Box>
          <Typography variant="h4" gutterBottom className='textLarge'>Your Courses:</Typography>
          {courses.length > 0 ? (
            courses.map((course) => (
              <Box key={course.id} sx={{ marginBottom: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }} className='textSmall'>
                <Box sx={{ width: '100px', height: 'auto' }}>
                  <img src={getImageUrlForId(course.id)} alt={course.name} style={{ width: '100%', height: 'auto' }} className='imgCart' />
                </Box>
                <Typography variant="h6" className='textSmall' sx={{ width: "50%" }}>
                  {course.name}
                </Typography>
                <Typography variant="body1" className='textSmall'>${course.price}</Typography>
                <Button variant="contained" color="primary" onClick={() => handleBuyCourse(course)} className='btn-small-text'>Buy</Button>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary" className='no'>View Course</Button>
                </Link>
                <Link >
                  <DeleteIcon className='textLarge' onClick={() => handleRemove(course)} />
                </Link>
              </Box>
            ))
          ) : (
            <Typography variant="body1" className='textSmall'>No courses added to your cart yet.</Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePurchase}
              disabled={courses.length === 0}
              sx={{ backgroundColor: "#3DC2EC", color: '#FFFFFF' }}
              className='btn-small-text'
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
          className='btn-small-text'
        >
          Go to Your Courses
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
