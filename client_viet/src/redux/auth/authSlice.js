import { createSlice } from "@reduxjs/toolkit";


const auth = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        admin:null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
        },
        loginAdmin: (state, action) => {
            state.admin = action.payload;
        },
        logoutAdmin: (state) => {
            state.admin = null;
        }
    }
})
export const {login,logoutUser,loginAdmin,logoutAdmin} = auth.actions;
export default auth.reducer;