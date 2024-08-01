import React from 'react';
import axios from 'axios';

const Checkout = () => {
  const handlePayment = () => {
    axios.post('/api/payment/process', paymentData)
      .then(res => console.log('Payment processed:', res.data))
      .catch(err => console.error('Payment error:', err));
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
};

export default Checkout;
