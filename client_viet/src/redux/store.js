import {configureStore} from '@reduxjs/toolkit'

import cartReducer from './cart/cartSplice'
import authReducer from './auth/authSlice'
const store  = configureStore({
    reducer:{
       cart: cartReducer,
       auth: authReducer
    }
})
export default store;