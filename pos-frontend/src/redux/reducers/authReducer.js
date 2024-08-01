// src/redux/reducers/authReducer.js
const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
            };
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default authReducer;
