import React, { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, MenuItem, Menu, Button } from '@mui/material';
import { AccountCircle, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth';
import { coursesReducer } from '../Redux/slices';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [emailPrefix, setEmailPrefix] = useState('');
  const navigate = useNavigate();
  const num = useSelector(state => state.courses.num);
  const money = useSelector(state => state.courses.money);

  useEffect(() => {
    const savedEmailPrefix = localStorage.getItem('emailPrefix');
    if (savedEmailPrefix) {
      setEmailPrefix(savedEmailPrefix);
    }
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    const auth = getAuth();
    firebaseSignOut(auth)
      .then(() => {
        localStorage.removeItem('emailPrefix');
        localStorage.removeItem('paymentAmount');
        setEmailPrefix('');
        dispatch(coursesReducer.actions.reset());
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className='appbar' sx={{ background: '#3DC2EC' }}>
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" component="div">
              Yous Academy
            </Typography>
          </Link>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!emailPrefix ? (
              <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit', marginLeft: 2 }}>
                <Button color="inherit">Sign Up</Button>
              </Link>
            ) : (
              <>
                <Typography variant="h6" component="div" sx={{ marginLeft: 2 }} className='hello'>
                  Hello, {emailPrefix}!
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 2 }}>
                  <Link to="/payment" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'inherit', marginRight: 2 }}>
                    <Typography>
                      {money} $
                    </Typography>
                  </Link>
                  <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ShoppingCartIcon />
                      <Typography sx={{ marginLeft: 1 }}>{num}</Typography>
                    </Box>
                  </Link>
                </Box>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  sx={{ marginLeft: 2 }}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <MenuItem onClick={handleClose}>Home</MenuItem>
                  </Link>
                  <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <MenuItem onClick={handleClose}>My cart</MenuItem>
                  </Link>
                  <Link to="/mycourses" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <MenuItem onClick={handleClose}>My Courses</MenuItem>
                  </Link>
                  <MenuItem onClick={handleSignOut} style={{ color: '#FF6F61' }}>
                    Sign Out
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
