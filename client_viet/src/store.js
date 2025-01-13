import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './features/web/cart/redux/cartSplice'
import authReducer from './features/web/auth/redux/authSlice'
const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer
    }
})
export default store;