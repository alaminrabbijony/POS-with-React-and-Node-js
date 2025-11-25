import { configureStore } from "@reduxjs/toolkit";
import customerSlice from './slices/CustomerSlices.js';
import cartSlice from './slices/cartSlice.js';

const store = configureStore({
  reducer: {
    customer: customerSlice,
    cart: cartSlice,
  },
   devTools: import.meta.env.DEV,


});
export default store;


//Global types for store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
