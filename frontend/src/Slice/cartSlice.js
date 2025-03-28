import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils.js";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      bookingInformation: {},
      selectedTables: [],
      paymentMethod: "",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((x) => x._id === id);

      if (item) {
        item.quantity = quantity;
      }

      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      return updateCart(state);
    },

    selectedTables: (state, action) => {
      state.selectedTables = action.payload;
      return updateCart(state);
    },

    bookingInformation: (state, action) => {
      state.bookingInformation = action.payload;
      return updateCart(state);
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      state.cartItems = [];
      state.bookingInformation = {};
      state.selectedTables = [];
      state.paymentMethod = "";

      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  clearCartItems,
  updateQuantity,
  bookingInformation,
  selectedTables,
} = cartSlice.actions;
export default cartSlice.reducer;
