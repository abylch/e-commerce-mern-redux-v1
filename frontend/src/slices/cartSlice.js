import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

// we pass all the cart functions to a separete file in the utils folder cartUtils.js

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  //: { cartItems: [] };
  // add shipping address and payment method
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // The item to add to the cart
      const item = action.payload;

      // Update the cart state using the updateCart function
      // Check if the item is already in the cart
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // If exists, update quantity
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // If not exists, add new item to cartItems
        state.cartItems = [...state.cartItems, item];
      }

      // Update the prices and save to storage
      return updateCart(state, item);
    },
    // add shipping address
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    // add the remove item from cart function
    removeFromCart: (state, action) => {
      // Filter out the item to remove from the cart
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      // Update the prices and save to storage
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress } = cartSlice.actions;

export default cartSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// // store in local, so items stays in the cart
// const initialState = localStorage.getItem('cart')
//   ? JSON.parse(localStorage.getItem('cart'))
//   : { cartItems: [] };

// const addDecimals = (num) => {
//   return (Math.round(num * 100) / 100).toFixed(2);
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       // The item to add to the cart
//       const item = action.payload;

//       // Check if the item is already in the cart
//       const existItem = state.cartItems.find((x) => x._id === item._id);

//       if (existItem) {
//         // If exists, update quantity
//         state.cartItems = state.cartItems.map((x) =>
//           x._id === existItem._id ? item : x
//         );
//       } else {
//         // If not exists, add new item to cartItems
//         state.cartItems = [...state.cartItems, item];
//       }

//       // Calculate the items price, acc(is the acumulator), plus (the new item by quantity of the new item)
//       state.itemsPrice = addDecimals(
//         state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
//       );

//       // Calculate the shipping price | If items price is greater than 100, shipping is free | If not, shipping is 10
//       state.shippingPrice = addDecimals(state.itemsPrice > 500 ? 0 : 150);

//       // Calculate the tax price | Tax is 17% of the items price
//       state.taxPrice = addDecimals(
//         Number((0.17 * state.itemsPrice).toFixed(2))
//       );

//       // Calculate the total price | Total price is the sum of the items price, shipping price and tax price
//       state.totalPrice = (
//         Number(state.itemsPrice) +
//         Number(state.taxPrice) +
//         Number(state.shippingPrice)
//       ).toFixed(2);

//       // Save the cart to localStorage
//       localStorage.setItem('cart', JSON.stringify(state));
//     },
//   },
// });

// export const { addToCart } = cartSlice.actions;

// export default cartSlice.reducer;