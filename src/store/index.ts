import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'store/slices/userSlice';
import productReducer from 'store/slices/productSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    productCards: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
