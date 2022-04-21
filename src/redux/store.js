import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import itemsReducer from "../features/items/itemsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items:itemsReducer
  },
});
