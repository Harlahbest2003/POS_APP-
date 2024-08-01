// src/redux/actions/authActions.js
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
    try {
        const res = await axios.post('/api/users/login', { email, password });
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (err) {
        console.error(err);
    }
};

export const logout = () => (dispatch) => {
    dispatch({ type: 'LOGOUT' });
};
