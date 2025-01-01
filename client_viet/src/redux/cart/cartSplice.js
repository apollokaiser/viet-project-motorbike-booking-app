import { createSlice } from "@reduxjs/toolkit";
import Alert from "@utils/Alert";


const cart = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0, // total is the total price of items (not include shipping charges)
        transport_fee: {}
    },
    reducers: {
        addCart: (state, actions) => {
            const index = state.items.findIndex(item => item.id == actions.payload.id
                && item.bienSoXe == actions.payload.bienSoXe)
            if (index == -1) {
                state.items.push(actions.payload);
            }
        },
        removeCart: (state, actions) => {
            console.log(actions.payload);
            console.log(state.items);
            state.items = state.items.filter(item => item.bienSoXe != actions.payload.bienSoXe);
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
                    const list = state.items.filter(item => item.id == detail.ma_xe);
                    if (list && list.length > 0) {
                        list.forEach(item => {
                            const index = state.items.indexOf(item);
                            state.items[index] = { ...state.items[index], detail }
                        })
                    }
                });
            }
        },
        addQuantity: (state, actions) => {
            const index = state.items.findIndex(item => item.id == actions.payload.id);
            if (index > -1) {
                state.items[index].quantity = actions.payload.quantity;
            }
        },
        setTransportFee: (state, actions) => {
            state.transport_fee = actions.payload;
        },
        changeBienSoXe: (state, actions) => {
            //tìm vị trí của sản phẩm cũ
            const indexOldBSX = state.items.findIndex(item => item.id == actions.payload.id
                && item.bienSoXe == actions.payload.oldBSX)
            if (indexOldBSX != -1) { // tìm thấy
                // tìm xem coi có xe nào có biến số trùng với biển số vừa đổi không
                const indexNewBSX = state.items.findIndex(item => item.id == actions.payload.id
                    && item.bienSoXe == actions.payload.bienSoXe)
                if (indexNewBSX == -1) { // nếu không tìm thấy thì đổi biển số xe
                    state.items[indexOldBSX].bienSoXe = actions.payload.bienSoXe;
                } else {
                    // nếu tìm thấy thì xóa sản phẩm cũ luôn
                    Alert.showToast("Biển số xe đã tồn tại và được xác nhập làm một", "info");
                    state.items.splice(indexOldBSX, 1);
                }
            }
        }
    },
    extraReducers: builder => {
        builder.addMatcher(
            (actions) => actions.type.startsWith('cart/'),
            (state) => {
                state.total = state.items.reduce(
                    (total, item) => total + ((Number.parseInt(item.detail?.gia_thue) || 0)),
                    0
                );
            }
        )
    }
})
export const { changeBienSoXe, addCart, removeCart, reduceQuantity, addDetails, addQuantity, setTransportFee } = cart.actions;
export default cart.reducer;
