import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userAuth from "./authSlice";

const reducer = combineReducers({
  user: userAuth.reducer,
});

const store = configureStore({
  reducer,
});

export default store;
