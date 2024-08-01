// src/pages/PaymentPage.js
import React, { useState } from 'react';
import PaystackButton from '../components/PaystackButton';

const PaymentPage = () => {
  // Commenting out setItems as it's not currently used
  const [items, setItems] = useState([]); 

  // Sample data for testing
  const amount = 1000;
  const email = "customer@example.com";

  return (
    <div>
      <h1>Payment Page</h1>
      
      <PaystackButton amount={amount} email={email} />
    </div>
  );
};

export default PaymentPage;
