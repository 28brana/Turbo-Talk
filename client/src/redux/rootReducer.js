import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/auth.slice";
const rootReducer = combineReducers({ auth: authSlice, });

export default rootReducer;