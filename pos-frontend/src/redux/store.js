// src/redux/store.js
// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice'; // Adjust import path as necessary

const store = configureStore({
  reducer: {
    products: productReducer, // Add other reducers here if needed
  },
});

export default store;
