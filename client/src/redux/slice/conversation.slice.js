import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userDetail: {}
}

export const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        currentConversation: (state, action) => {
            state.userDetail = action.payload;
        },

    },
})

export const { currentConversation } = conversationSlice.actions

export default conversationSlice.reducer