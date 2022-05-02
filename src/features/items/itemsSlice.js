import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
  name: "items",
  initialState: {
    value: [],
    selected: {
      payload: {
        _id: 0,
        code: 0,
        name: "some name of item",
        price: 100,
      },
    }, // selected is for item that is being selected to edit
  },
  reducers: {
    storeItems: (state, items) => {
      state.value = items;
    },
    deleteItems: (state) => {
      state.value = [];
    },
    selectedItems: (state, item) => {
      state.selected = item;
    },
  },
});
export const { storeItems, deleteItems, selectedItems } = itemsSlice.actions;

export default itemsSlice.reducer;
