import { createSlice } from "@reduxjs/toolkit";
import type { CustomerInfoTypes } from "../../Types.js";

const initialState: CustomerInfoTypes = {
  orderId: null,
  customerName: "",
  customerPhone: "",
  guest: 0,
  table: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomerInfo: (state, action) => {
      // create orderId ONCE
      if (!state.orderId) {
        state.orderId = `${Date.now()}`;
      }

      // merge only provided fields
      if (action.payload.name !== undefined) {
        state.customerName = action.payload.name;
      }

      if (action.payload.phone !== undefined) {
        state.customerPhone = action.payload.phone;
      }

      if (action.payload.guest !== undefined) {
        state.guest = action.payload.guest;
      }
    },

    updateTable: (state, action) => {
      state.table = action.payload.table;
    },

    removeCustomerInfo: () => initialState,
  },
});

export const { setCustomerInfo, removeCustomerInfo, updateTable } =
  customerSlice.actions;
export default customerSlice.reducer;
