import { createSlice } from '@reduxjs/toolkit'


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalPrice: 0,
        totalQuantity: 0
    },

    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            state.totalQuantity++;

            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    category: newItem.category,
                    img: newItem.img,
                    quantity: 1,
                    // totalPrice: newItem.price,
                    
                });
                state.totalPrice = Number(state.totalPrice) + Number(newItem.price);


            } else {
                existingItem.quantity++;
                state.totalPrice = Number(state.totalPrice) + Number(newItem.price);
            }
        },



        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.totalPrice = state.totalPrice - existingItem.price;
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
                state.totalPrice = state.totalPrice - existingItem.price;
            }
        },
    }
})


export const cartActions = cartSlice.actions;
export default cartSlice;