import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'productCard',
    initialState: [],
    reducers: {
        addProductToBasket: (state, action) => {
            state.push(action.payload);
        },
        removeProductFromBasket: (state, action) => {
            return state.filter(card => card.id !== action.payload.id);
        },
        updateProductInBasket: (state, action) => {
            const index = state.findIndex(card => card.id === action.payload.id)
            if (index !== -1){
                state[index] = action.payload;
            }
        }
    }
})

export const {addProductToBasket, removeProductFromBasket, updateProductInBasket} = productSlice.actions;

export default productSlice.reducer;