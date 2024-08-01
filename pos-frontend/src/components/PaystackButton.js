// src/components/PaystackButton.js
import React from 'react';
import { usePaystackPayment } from 'react-paystack';

const PaystackButton = ({ amount, email }) => {
  const config = {
    reference: (new Date()).getTime().toString(),
    email,
    amount: amount * 100, // Paystack works with kobo
    publicKey: 'pk_test_35882cc911cedac6ceb53bf8e04459e3251a2b37', 
  };

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  const onClose = () => {
    // Implementation for whatever you want to do when the Paystack dialog closed.
    console.log('closed');
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <div>
      <button className='btn btn-primary' onClick={() => initializePayment(onSuccess, onClose)}>
        Pay Now
      </button>
    </div>
  );
};

export default PaystackButton;
