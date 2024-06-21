import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse, purchaseCourses, addMoney, buyCourse } from '../Redux/slices';
import { Box, Typography, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import data from '../scene/HomeData';

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

  const handleBuyCourse = (course) => {
    dispatch(buyCourse(course));
  };

  const goToMyCourses = () => {
    navigate('/mycourses');
  };

  const getImageUrlForId = (id) => {
    const course = data.find(course => course.id === id);
    return course ? course.src : 'https://placeholder.com/placeholder.jpg'; // Replace with a default image URL if title not found
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
                  <img src={getImageUrlForId(course.id)} alt={course.name} style={{ width: '100%', height: 'auto' }} />
                </Box>
                <Typography variant="h6" className={course.className} sx={{ width: "50%" }}>
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
          Go to Your Courses  🡆
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
