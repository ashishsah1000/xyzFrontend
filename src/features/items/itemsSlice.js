import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
  name: "items",
  initialState: {
    value: [],
    selected: [], // selected is for item that is being selected to edit
  },
  reducers: {
    storeItems: (state, items) => {
      state.value = items;
    },
    deleteItems: (state) => {
      state.value = [];
    },
    selectedItems: (state, item) => {
      state.seclected = item;
    },
  },
});
export const { storeItems, deleteItems } = itemsSlice.actions;

export default itemsSlice.reducer;
