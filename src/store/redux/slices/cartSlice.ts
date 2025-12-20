import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState, MenuItem } from "../../Types.js";

const initialState: CartState = {
  items: [],
  quantity: 0,
  totalPrice: 0,
};

const recalc = (state: CartState) => {
  state.quantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
  state.totalPrice = state.items.reduce((sum, i) => sum + i.totalPrice, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (
      state,
      action: PayloadAction<{
        id: string | number;
        name: string;
        price: number;
        quantity: number;
        totalPrice: number;
      }>
    ) => {
      const { id, name, price, quantity, totalPrice } = action.payload;
      if (quantity <= 0) return; // ignore zero or negative qty

      const existingItem = state.items.find((i) => i.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          id,
          name,
          price,
          quantity: quantity,
          totalPrice: totalPrice,
        });
      }

      // Recalculate total quantity and price
      recalc(state);
    },
    removeItemFromCart: (state, action: PayloadAction<string | number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);

      // Recalculate total quantity and price
      recalc(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload; // destructure payloads
      // find the item in the cart
      const item = state.items.find((i) => i.id === id);
      if (!item) return; // if not found, exit

      if (quantity <= 0) {
        // remove item if quantity is zero or less
        state.items = state.items.filter((i) => i.id !== id);
      }

      //update quantity and total price on each cart item
      item.quantity = quantity;
      item.totalPrice = item.price * quantity;

      // Recalculate total quantity and price
      recalc(state);
    },
    removeAllItems: (state) => initialState
  },
});
export const { addItemToCart, removeItemFromCart, updateQuantity, removeAllItems } = cartSlice.actions;
export default cartSlice.reducer;
