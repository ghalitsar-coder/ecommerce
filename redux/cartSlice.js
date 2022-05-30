import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalPrice: 0,
    quantities: 0,
    showCart: false,
  },
  reducers: {
    fetchProducts: (state, { payload }) => {
      state.products = payload;
    },
    addToCart: (state, { payload }) => {
      const product = state.products.find((p) => p.name === payload.name);
      if (product) {
        product.quantity += payload.quantity;
        product.priceTotal += payload.priceTotal;
      } else {
        state.quantities += 1;
        state.products.push(payload);
      }
      state.totalPrice += payload.priceTotal;
      toast.success(`${payload.quantity} ${payload.name} added to the cart`);
    },
    showCartMenu: (state) => {
      state.showCart = !state.showCart;
    },
    decQuantity: (state, { payload }) => {
      const product = state.products.find((p) => p._id === payload);
      if (product) {
        if (product.quantity === 1) {
          state.products = state.products.filter((p) => p._id !== payload);
          state.quantities -= 1;
        } else {
          product.quantity -= 1;
          product.priceTotal -= product.price;
        }

        state.totalPrice -= product.price;
      }
    },
    incQuantity: (state, { payload }) => {
      const product = state.products.find((p) => p._id === payload);
      product.quantity += 1;
      product.priceTotal += product.price;
      state.totalPrice += product.price;
    },
    removeProduct: (state, { payload }) => {
      const product = state.products.find((p) => p._id === payload);
      state.totalPrice -= product.priceTotal;
      state.products = state.products.filter((p) => p._id !== payload);
      state.quantities -= 1;
    },
    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
      state.quantities = 0;
      state.showCart = false;
    },
  },
});

export const {
  fetchProducts,
  addToCart,
  showCartMenu,
  decQuantity,
  incQuantity,
  removeProduct,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
