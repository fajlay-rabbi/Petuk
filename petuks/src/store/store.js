import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './CartSlice';
import userSlice from './UserSlice';


const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        user: userSlice.reducer
    }
})

export default store;