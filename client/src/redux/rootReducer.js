import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/auth.slice";
import conversationSlice from "./slice/conversation.slice";
const rootReducer = combineReducers({ auth: authSlice, conversation: conversationSlice });

export default rootReducer;