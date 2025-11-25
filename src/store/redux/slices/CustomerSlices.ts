import { createSlice } from "@reduxjs/toolkit";
import type { CustomerInfoTypes } from "../../Types.js";

const intialState : CustomerInfoTypes = {
    orderId: '',
    customerName: "",
    customerPhone: "",
    guest: 0,
    tableNo: '',
}

const customerSlice =  createSlice({
    name: 'customer',
    initialState: intialState,
    reducers: {
        setCustomerInfo: (state, action) => {
            const {CustomerId,name, phone, guest, tableNo} = action.payload;
            state.orderId = `${Date.now()}`;
            state.customerName = name;
            state.customerPhone = phone;
            state.guest = guest;
            state.tableNo = tableNo;
        },
        removeCustomerInfo : (state) => intialState,
        updateTable: (state, action) => {
            state.tableNo = action.payload.tableNo;
        }
    }
})

export const {setCustomerInfo, removeCustomerInfo, updateTable} = customerSlice.actions;
export default customerSlice.reducer