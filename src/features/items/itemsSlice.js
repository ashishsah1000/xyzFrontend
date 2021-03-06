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
        stock: 0,
        description: "",
        category: "",
      },
    }, // selected is for item that is being selected to edit
    billing: [],
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
    billingItems: (state, item) => {
      if (state.billing.length == 0) state.billing = [item.payload];
      else state.billing.push(item.payload);
    },
  },
});
export const { storeItems, deleteItems, selectedItems, billingItems } =
  itemsSlice.actions;

export default itemsSlice.reducer;
