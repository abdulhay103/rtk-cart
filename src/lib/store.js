import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./rtk-features/cartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cartReducer: cartReducer,
    },
  });
};
