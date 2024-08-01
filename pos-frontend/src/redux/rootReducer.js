// src/redux/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import someSliceReducer from './someSlice';

const rootReducer = combineReducers({
  someSlice: someSliceReducer,
  // Add other slice reducers here
});

export default rootReducer;
