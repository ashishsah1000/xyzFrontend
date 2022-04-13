import { createSlice } from "@reduxjs/toolkit";
import { setUser, deleteUser } from "../../setStorage/localUser";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, info) => {
      state.user = info;
      setUser(info);
    },
    logout: (state) => {
      state.user = null;
      deleteUser();
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
