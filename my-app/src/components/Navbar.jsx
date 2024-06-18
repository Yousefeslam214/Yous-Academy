import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getAuth, signOut } from "firebase/auth";



const Navbar = () => {

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [emailPrefix, setEmailPrefix] = useState('');
    const [savedPaymentAmount, setSavedPaymentAmount] = useState(0); // Initialize with 0

    useEffect(() => {
        // Retrieve paymentAmount from localStorage on component mount
        const savedPaymentAmount = parseFloat(localStorage.getItem('paymentAmount')) || 0;
        setSavedPaymentAmount(savedPaymentAmount);
    }, []);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    {/* my code */ }
    const num = useSelector(state => state.courses.num);
    const signOut = () => {
        localStorage.setItem('emailPrefix', "");
        setEmailPrefix('');
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    };


    useEffect(() => {
        // Retrieve the email prefix from local storage
        const savedEmailPrefix = localStorage.getItem('emailPrefix');
        if (savedEmailPrefix) {
            setEmailPrefix(savedEmailPrefix);
        }
    }, []);
    console.log(!!emailPrefix)
    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* <FormGroup>

                <FormControlLabel
                    control={
                        <Switch
                            checked={auth}
                            onChange={handleChange}
                            aria-label="login switch"
                        />
                    }
                    label={emailPrefix ? 'Logout' : 'Login'}
                />
            </FormGroup> */}
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Link to="/">
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            You Academy
                        </Typography>
                    </Link>
                    {emailPrefix && <Typography variant="h6" component="div">Hello, {emailPrefix}!</Typography>}

                    {emailPrefix && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
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
                                <Link to="/profile">

                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                </Link>
                                <Link to="/cart" >

                                    <MenuItem onClick={handleClose}>My cart</MenuItem>
                                </Link>
                            </Menu>
                        </div>
                    )}
                    {emailPrefix ? (
                        <button onClick={signOut}>Sign Out</button>
                    ) : (
                        <Link to="/login">
                            <button>Sign Up</button>
                        </Link>
                    )}
                    <Link to="/cart">
                        {num}
                        <ShoppingCartIcon />
                    </Link>
                    <Link to="/payment">

                        <Typography>
                            {savedPaymentAmount} $
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default Navbar

