import { createSlice } from "@reduxjs/toolkit";


const auth = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
})
export const {login,logout} = auth.actions;
export default auth.reducer;