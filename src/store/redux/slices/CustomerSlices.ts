import { createSlice } from "@reduxjs/toolkit";
import type { CustomerInfoTypes } from "../../Types.js";

const intialState : CustomerInfoTypes = {
    orderId: '',
    customerName: "",
    customerPhone: "",
    guest: 0,
    table: null,
}

const customerSlice =  createSlice({
    name: 'customer',
    initialState: intialState,
    reducers: {
        setCustomerInfo: (state, action) => {
            const {name, phone, guest, tableNo} = action.payload;
            state.orderId = `${Date.now()}`;
            state.customerName = name;
            state.customerPhone = phone;
            state.guest = guest;
            state.table = null;
        },
        removeCustomerInfo : (state) => intialState,
        updateTable: (state, action) => {
            state.table = action.payload.table;
        }
    }
})

export const {setCustomerInfo, removeCustomerInfo, updateTable} = customerSlice.actions;
export default customerSlice.reducer