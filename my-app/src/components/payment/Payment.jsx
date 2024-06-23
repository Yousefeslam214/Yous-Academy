import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Divider, Typography, InputAdornment } from '@mui/material';
import cards from '../../assets/cards.png';
import Navbar from '../shared/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addMoney } from '../../Redux/slices';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const dispatch = useDispatch();
  const money = useSelector(state => state.courses.money);

  useEffect(() => {
    const savedPaymentAmount = parseFloat(localStorage.getItem('paymentAmount')) || 0;
    setPaymentAmount(savedPaymentAmount);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cardNumber || !nameOnCard || !paymentAmount) {
      alert('Please fill out all fields.');
      return;
    }

    const paymentAmountNumber = parseFloat(paymentAmount);
    if (isNaN(paymentAmountNumber) || paymentAmountNumber <= 0) {
      alert('Please enter a valid payment amount.');
      return;
    }

    dispatch(addMoney(paymentAmountNumber));
    localStorage.setItem('paymentAmount', (paymentAmountNumber).toFixed(2));

    setCardNumber('');
    setNameOnCard('');
    setPaymentAmount('');
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

  const handleAddMoney = (amount) => {
    dispatch(addMoney(amount));
  };

  return (
    <Box className="container">
      <Typography variant="h5" className='textLarge'>
        Payment Method
      </Typography>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleAddMoney(100)}
        className='no'
      >
        Add $100
      </Button>
      <Typography variant="h6" className='textLarge'>
        Credit Cards
      </Typography>
      <Typography className='textSmall'>
        You Academy accepts major credit and debit cards.
      </Typography>
      <img src={cards} alt="Accepted Cards" className='imgCart' />
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
            inputProps: {
              inputMode: 'numeric',
              pattern: '[0-9]*',
            },
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
              pattern: '[0-9]*',
            },
          }}
        />
        <Button type="submit" variant="contained" color="primary" className='btn-small-text'
        >
          Submit
        </Button>
      </form>
      <Typography variant="h6" mt="10px" className='textLarge'>
        Total Money: ${money}
      </Typography>
      <Box className="paypal" mt="20px">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => window.location.href = 'https://www.paypal.com/ncp/payment/U7X6Q54Y948RQ'}
          sx={{ backgroundColor: "#3DC2EC", color: '#FFFFFF' }}
          className='btn-small-text'
        >
          Go To PayPal
        </Button>
      </Box>
    </Box>
  );
};

export default Payment;
