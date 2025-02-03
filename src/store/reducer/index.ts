import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';
import productSlice from '../slices/productSlice';

export default combineReducers({
    userSlice,
    productSlice,
})
