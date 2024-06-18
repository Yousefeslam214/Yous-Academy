import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Divider, Typography, InputAdornment } from '@mui/material';
import cards from '../assets/cards.png';
import Navbar from '../components/Navbar';

const Payment = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [savedPaymentAmount, setSavedPaymentAmount] = useState(0); // Initialize with 0

    useEffect(() => {
        // Retrieve paymentAmount from localStorage on component mount
        const savedPaymentAmount = parseFloat(localStorage.getItem('paymentAmount')) || 0;
        setSavedPaymentAmount(savedPaymentAmount);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all form fields
        if (!cardNumber || !nameOnCard || !paymentAmount) {
            alert('Please fill out all fields.');
            return;
        }

        // Calculate new payment amount and save to localStorage
        const newPaymentAmount = savedPaymentAmount + parseFloat(paymentAmount);
        localStorage.setItem('paymentAmount', newPaymentAmount.toFixed(2)); // Ensure toFixed to save as string with 2 decimal places

        // Optionally, you can reset the form fields
        setCardNumber('');
        setNameOnCard('');
        setPaymentAmount('');
        setSavedPaymentAmount(newPaymentAmount); // Update savedPaymentAmount state
    };

    const handleCardNumberChange = (e) => {
        setCardNumber(e.target.value);
    };

    const handleNameOnCardChange = (e) => {
        setNameOnCard(e.target.value);
    };

    const handlePaymentAmountChange = (e) => {
        setPaymentAmount(e.target.value);
    };

    return (
        <Box>
            <Navbar />
            <Box m="20px">

                <Typography variant='h5'>
                    Payment Method
                </Typography>
                <Divider />
                <Typography variant='h6'>
                    Credit Cards
                </Typography>
                <Typography>
                    You Academy accepts major credit and debit cards.
                </Typography>
                <img src={cards} alt="Accepted Cards" />
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="cardNumber"
                        label="Card Number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Card Number</InputAdornment>,
                        }}
                    />
                    <TextField
                        id="nameOnCard"
                        label="Name on Card"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={nameOnCard}
                        onChange={handleNameOnCardChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Name on Card</InputAdornment>,
                        }}
                    />
                    <TextField
                        id="paymentAmount"
                        label="Payment Amount $"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={paymentAmount}
                        onChange={handlePaymentAmountChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            inputProps: {
                                inputMode: 'numeric',
                                pattern: '[0-9]*', // Only allow numeric input
                            },
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
                <Typography variant="h6">
                    Total Money: ${savedPaymentAmount.toFixed(2)}
                </Typography>
            </Box>
        </Box>

    );
};

export default Payment;
