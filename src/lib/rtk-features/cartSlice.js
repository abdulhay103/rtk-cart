import { createSlice } from "@reduxjs/toolkit";

const initialCarts = {
  cartItems: {
    qty: 1,
    productId: 0,
  },
};

export const cartSlices = createSlice({
  name: "orderCart",
  initialState: initialCarts,
  reducers: {
    buySingleItem: (state, action) => {
      state.cartItems.productId = action.payload;
      console.log(state.cartItems.productId);
    },
    increment_qty: (state, action) => {
      if (state.cartItems.qty < 5) {
        state.cartItems.qty += 1;
      }
      let id = action.payload;
      state.cartItems.productId = id;

      console.log("+ qty ", state.cartItems.qty);
      console.log("+ ID ", state.cartItems.productId);
    },
    decrement_qty: (state, action) => {
      if (state.cartItems.qty > 0) {
        state.cartItems.qty -= 1;
      }
      let id = action.payload;
      state.cartItems.productId = id;

      console.log("- qty ", state.cartItems.qty);
      console.log("- ID ", state.cartItems.productId);
    },
    update_qty: (state, action) => {
      state.cartItems.qty = 1;
      console.log("0 qty ", state.cartItems.qty);
      console.log("0 ID ", state.cartItems.productId);
      state.cartItems.productId = 0;
    },
  },
});

export const { buySingleItem, increment_qty, decrement_qty, update_qty } =
  cartSlices.actions;
export default cartSlices.reducer;
