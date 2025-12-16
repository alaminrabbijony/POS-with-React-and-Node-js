import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserInfoState } from "../../Types.js";

const initialState : UserInfoState = {
    _id: '',
    name: '',
    phone: "",
    email: '',
    token: undefined,
    role: '',
    isAuth: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        addUser: (state,action: PayloadAction<UserInfoState>) => {
            const {_id, name, phone, email, token, role, isAuth} = action.payload
            state._id = action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
            state.token = action.payload.token
            state.phone = action.payload.phone
            state.role = action.payload.role
            state.isAuth = true
        },
        removeUser: (state) => {
            Object.assign(state, initialState)
        }
    }
})

export const {addUser, removeUser} = userSlice.actions;
export default userSlice.reducer