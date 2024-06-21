import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getAuth, signOut as firebaseSignOut } from "firebase/auth";
import { coursesReducer } from '../Redux/slices';
import Button from '@mui/material/Button';

import './Navbar.css';

const Navbar = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [emailPrefix, setEmailPrefix] = useState('');
    const [savedPaymentAmount, setSavedPaymentAmount] = useState(0);
    const navigate = useNavigate();
    const num = useSelector(state => state.courses.num);
    const money = useSelector(state => state.courses.money);

    useEffect(() => {
        const savedPaymentAmount = parseFloat(localStorage.getItem('paymentAmount')) || 0;
        setSavedPaymentAmount(savedPaymentAmount);
    }, []);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        localStorage.setItem('emailPrefix', '');
        localStorage.setItem('paymentAmount', '');
        setEmailPrefix('');

        const auth = getAuth();
        firebaseSignOut(auth).then(() => {
            dispatch(coursesReducer.actions.reset());
            navigate('/');
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    };

    useEffect(() => {
        const savedEmailPrefix = localStorage.getItem('emailPrefix');
        if (savedEmailPrefix) {
            setEmailPrefix(savedEmailPrefix);
        }
    }, []);

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

                        {!emailPrefix && (
                            <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit', marginLeft: 2 }}>
                                <Button color="inherit">Sign Up</Button>
                            </Link>
                        )}


                        {emailPrefix && (
                            <>
                                <Typography variant="h6" component="div" sx={{ marginLeft: 2 }}>
                                    Hello, {emailPrefix}!
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 2 }}>
                                    <Link to="/payment" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'inherit', marginRight: 10 }}>
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
