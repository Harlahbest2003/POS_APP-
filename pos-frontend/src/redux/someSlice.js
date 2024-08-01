// src/redux/someSlice.js
import { createSlice } from '@reduxjs/toolkit';

const someSlice = createSlice({
  name: 'someSlice',
  initialState: {},
  reducers: {
    someAction: (state, action) => {
      // reducer logic
    },
  },
});

export const { someAction } = someSlice.actions;
export default someSlice.reducer;
