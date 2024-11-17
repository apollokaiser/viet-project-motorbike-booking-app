import {configureStore} from '@reduxjs/toolkit'

import cartReducer from './cart/cartSplice'

const store  = configureStore({
    reducer:{
       cart: cartReducer
    }
})
export default store;