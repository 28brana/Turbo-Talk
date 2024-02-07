import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userDetail:{},
    isLogin: false,
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLogin = true;
            state.token = action.payload.token;
            state.userDetail =action.payload.user;
        },
        logout: (state) => {
            state.isLogin = false;
            state.token = null;
            state.username = '';
            localStorage.removeItem('persist:root');
        }
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer