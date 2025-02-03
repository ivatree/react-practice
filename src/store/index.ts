import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    productCards: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
