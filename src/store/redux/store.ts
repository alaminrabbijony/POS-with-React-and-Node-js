import { configureStore } from "@reduxjs/toolkit";
import customerSlice from './slices/CustomerSlices.js';

const store = configureStore({
  reducer: {
    customer: customerSlice,
  },
   devTools: import.meta.env.DEV,


});
export default store;


//Global types for store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
