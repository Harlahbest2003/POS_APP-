// utils/paystackUtil.js

const axios = require('axios');
require('dotenv').config();

const paystack = axios.create({
  baseURL: 'https://api.paystack.co',
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json'
  }
});

const initiatePayment = async (amount, email) => {
  try {
    const response = await paystack.post('/transaction/initialize', {
      amount: amount * 100, // amount in kobo
      email
    });
    return response.data;
  } catch (err) {
    console.error('Paystack payment initiation error:', err);
    throw new Error('Could not initiate payment with Paystack');
  }
};

module.exports = { initiatePayment };
