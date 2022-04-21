import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
    name:'items',
    initialState:{
        value:[],
    },
    reducers:{
        storeItems:(state,items) =>{
            state.value = items
        },
        deleteItems : (state)=>{
            state.value=[]
        }
    }
})
export const {storeItems,deleteItems} =itemsSlice.actions

export default itemsSlice.reducer
