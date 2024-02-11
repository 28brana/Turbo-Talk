import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    onlineUsers: [],
}

export const userStatus = createSlice({
    name: 'userStatus',
    initialState,
    reducers: {
        updateUserStatusList: (state, action) => {
            state.onlineUsers = action.payload;
        },
    },
})

export const { updateUserStatusList } = userStatus.actions

export default userStatus.reducer