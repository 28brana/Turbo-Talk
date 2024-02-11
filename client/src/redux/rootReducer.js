import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/auth.slice";
import conversationSlice from "./slice/conversation.slice";
import userStatusSlice from "./slice/userStatus.slice";
const rootReducer = combineReducers({ auth: authSlice, conversation: conversationSlice, userStatus: userStatusSlice });

export default rootReducer;