import { createSlice } from '@reduxjs/toolkit';

// Part1: Define Slice (including reducers and actions)
const shippingMethod = 'pickup'; // 預設為 pickup

const cartItems = [];
const shippingAddress = {};
const price = {};
const initialState = { cartItems:[], shippingAddress, price, shippingMethod };
const cartSlice = createSlice({
  name: 'cart',
  initialState:{
  },
  reducers: {
    addCartItems: (state, action) => {
      const newItem = action.payload;
       if (!newItem || typeof newItem !== 'object' || !newItem.id) {
    console.warn("⚠️ addCartItems received invalid item:", newItem);
    return;
  }
      const existItem = state.cartItems.find((x) => x?.id === newItem.id);

  if (existItem) {
    state.cartItems = state.cartItems.map((x) =>
      x?.id === existItem.id ? { ...x, qty: newItem.qty } : x
    );
  } else {
    state.cartItems.push(newItem);
  }
    },
    removeCartItems: (state, action) => {
  state.cartItems = state.cartItems.filter((x) => x && x.id !== action.payload);
},
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    
    savePrice: (state, action) => {
      state.price = action.payload;
    },
    saveShippingMethod: (state, action) => {
      state.shippingMethod = action.payload;
    },
    clearShippingAddress: (state) => {
      state.shippingAddress = {};
    },
    clearCartItems: (state) => {
      state.cartItems = [];
    },
    setCartItems: (state, action) => {
  state.cartItems = action.payload.filter(
    item =>
      item &&
      typeof item.id === "string" &&
      typeof item.price === "number" &&
      typeof item.qty === "number"
  );
}

  },
  
});

// export state to global
export const selectCartItems = (state) => state.cart.cartItems;
export const selectShippingAddress = (state) => state.cart.shippingAddress;
export const selectPrice = (state) => state.cart.price;
export const {  clearShippingAddress } = cartSlice.actions;

// export actions to global
export const { addCartItems, removeCartItems, saveShippingAddress, savePrice } = cartSlice.actions;

// export reducer to global
export default cartSlice.reducer;

export const selectShippingMethod = (state) => state.cart.shippingMethod;
export const { saveShippingMethod } = cartSlice.actions;
export const { clearCartItems } = cartSlice.actions;
