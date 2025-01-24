import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    phone: null,
    token: null, 
    id: null,
}

const userSilce = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action){
            state.phone = action.payload.phone;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        removeUser(state){
            state.phone = null;
            state.token = null;
            state.id = null;
        },
    },
})

export const {setUser, removeUser} = userSilce.actions

export default userSilce.reducer;