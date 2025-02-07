import { combineReducers } from '@reduxjs/toolkit';
import userSlice from 'store/slices/userSlice';
import productSlice from 'store/slices/productSlice';

export default combineReducers({
    userSlice,
    productSlice,
})
