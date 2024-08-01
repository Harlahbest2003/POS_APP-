// src/redux/actions/paymentActions.js
import axios from 'axios';
import { returnErrors } from './errorActions';

export const makePayment = (items, totalAmount, token, userEmail) => async (dispatch) => {
    try {
        const res = await axios.post('/api/payments', { items, totalAmount, token, userEmail });
        dispatch({ type: 'PAYMENT_SUCCESS', payload: res.data });
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: 'PAYMENT_FAIL' });
    }
};
