import { createSlice } from "@reduxjs/toolkit";

const initialCarts = {
  cartItems: 1,
};

export const cartSlices = createSlice({
  name: "orderCart",
  initialState: initialCarts,
  reducers: {
    increment_qty: (state, action) => {
      if (state.cartItems < 5) {
        state.cartItems += 1;
      }
      console.log(state.cartItems);
    },
    decrement_qty: (state, action) => {
      if (state.cartItems > 0) {
        state.cartItems -= 1;
      }
      console.log(state.cartItems);
    },
  },
});

export const { increment_qty, decrement_qty } = cartSlices.actions;
export default cartSlices.reducer;
