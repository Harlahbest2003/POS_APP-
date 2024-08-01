// src/redux/actions/errorActions.js
export const returnErrors = (msg, status, id = null) => {
    return {
        type: 'GET_ERRORS',
        payload: { msg, status, id },
    };
};

export const clearErrors = () => {
    return {
        type: 'CLEAR_ERRORS',
    };
};
