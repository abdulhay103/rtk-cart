import { createSlice } from "@reduxjs/toolkit";

const initialCarts = {
  cartItems: [
    {
      qtr: 1,
      discount_price: 0,
      price: 0,
    },
  ],
};

export const cartSlices = createSlice({
  name: cartSlices,
  initialState: initialCarts,
  reducers: {
    incriment_qtr: (state, action) => {
      console.log("Incriment");
    },
    deccriment_qtr: (state, action) => {
      console.log("Deccriment");
    },
  },
});
