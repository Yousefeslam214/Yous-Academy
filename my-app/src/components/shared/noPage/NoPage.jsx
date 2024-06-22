import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NoPage = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center',
                backgroundColor: '#f0f0f0',
                padding: '20px'
            }}
        >
            <Typography variant="h1" component="div" sx={{ mb: 2, color: '#333' }}>
                404
            </Typography>
            <Typography variant="h5" component="div" sx={{ mb: 3, color: '#666' }}>
                Oops! The page you're looking for doesn't exist.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={goToHome}
                sx={{ backgroundColor: '#6200ea', color: '#fff', padding: '10px 20px' }}
            >
                Go to Home
            </Button>
        </Box>
    );
}

export default NoPage;
