import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Table } from "../../../types/types.js";

const initialState: Table[] = []

const tableSlice = createSlice({
  name: "table",
    initialState,
  reducers: {
    getTables: (state, action: PayloadAction<Table[]>) => {
     return action.payload
    },
    createTable: (state, action: PayloadAction<Table>) => {
        state.push(action.payload)
    },
    removeTable: (state, action: PayloadAction<string>) => {
       return state.filter(t=> t._id !== action.payload)
    }
  },
});

export const {getTables,createTable, removeTable } = tableSlice.actions
export default tableSlice.reducer
