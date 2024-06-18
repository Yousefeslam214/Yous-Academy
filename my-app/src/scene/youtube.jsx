import React from 'react';
import { Box } from '@mui/material';
import Home from './Home';

export default function YouTube() {
    return (
        <Box sx={{ overflow: 'hidden' }}>
            <Home loading />
            <Home />
        </Box>
    );
}
