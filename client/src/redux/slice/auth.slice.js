import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: '',
    isLogin: false,
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username;
            state.isLogin = true;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isLogin = false;
            state.token = null;
            state.username = '';
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer