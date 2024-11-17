import { createSlice } from "@reduxjs/toolkit";


const cart = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0
    },
    reducers: {
        addCart: (state, actions) => {
            const index = state.items.findIndex(item => item.id == actions.payload.id)
            if (index > -1) {
                state.items[index].quantity += actions.payload.quantity;
            } else {
                state.items.push(actions.payload);
            }
        },
        removeCart: (state, actions) => {
            state.items = state.items.filter(item => item.id != actions.payload.id);
        },
        reduceQuantity: (state, actions) => {
            const index = state.items.findIndex(item => item.id == actions.payload.id);
            if (index > -1) {
                state.items[index].quantity--;
            }
        },
        addDetails: (state, actions) => {
            if (actions.payload?.length > 0) {
                actions.payload.forEach(detail => {
                    const index = state.items.findIndex(item => item.id == detail.ma_xe);
                    if (index > -1) {
                        state.items[index] = { ...state.items[index], detail }
                    }
                });
            }
        },
        addQuantity: (state, actions) => {
            const index = state.items.findIndex(item => item.id == actions.payload.id);
            if (index > -1) {
                    state.items[index].quantity = actions.payload.quantity;
        }
    }
    },
    extraReducers: builder => {
        builder.addMatcher(
            (actions) => actions.type.startsWith('cart/'),
            (state) => {
                state.total = state.items.reduce(
                    (total, item) => total + ((item.detail?.gia_thue || 0) * (item.quantity || 1)),
                    0
                );
            }
        )
    }
})
export const { addCart, removeCart, reduceQuantity, addDetails, addQuantity } = cart.actions;
export default cart.reducer;
