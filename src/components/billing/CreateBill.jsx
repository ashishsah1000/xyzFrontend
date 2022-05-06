import React, { useEffect, useState } from "react";
// material ui elements
import {
  Box,
  Typography,
  Grid,
  FormControlLabel,
  Switch,
  TextField,
  Button,
} from "@mui/material";

// imports for snackbars
import { Notify } from "../items";
// basic tables
import { BasicTable } from "../items";

// redux elements
import { useDispatch, useSelector } from "react-redux";
import { billingItems } from "../../features/items/itemsSlice";

export default function CreateBill() {
  // styling of the box
  //redux store items
  var store = useSelector((state) => state.items.value.payload); // all the value of store data stored in redux

  //   useState
  const [customItem, setcustomItem] = useState(false); // if adding a custom item not present in list show form

  const [itemId, setitemId] = useState(""); //get the itemId and search for the element
  const [discount, setdiscount] = useState(0);
  const [sellingPrice, setsellingPrice] = useState(0);
  const [quantity, setquantity] = useState(1);

  //   add selected items to redux store
  const dispatch = useDispatch();

  useEffect(() => {}, [store]);
  console.log();

  if (store)
    return (
      <Box
        sx={{
          height: "70vh",
          padding: "20px 20px",
          background: "white",
          borderRadius: "10px",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked
                  onClick={() => {
                    setcustomItem(!customItem);
                  }}
                />
              }
              label="Store Item"
            />
          </Grid>
          {!customItem ? (
            <>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  onChange={(e) => {
                    setitemId(e.target.value);
                  }}
                  type="text"
                  label="Please enter the ID of item"
                  fullWidth="100%"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled={sellingPrice > 0 ? true : false}
                  size="small"
                  onChange={(e) => {
                    setdiscount(e.target.value);
                  }}
                  type="text"
                  label="Any Discount"
                  fullWidth="100%"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled={discount > 0 ? true : false}
                  size="small"
                  onChange={(e) => {
                    setsellingPrice(e.target.value);
                  }}
                  type="text"
                  label="Or Selling Price"
                  fullWidth="100%"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  onChange={(e) => {
                    setquantity(e.target.value);
                  }}
                  defaultValue={1}
                  type="text"
                  label="Quantity"
                  fullWidth="100%"
                />
              </Grid>
              <Grid height="20vh" xs={12} overflow="hidden">
                <BasicTable
                  items={store?.filter((val) =>
                    itemId.length == 0 ? val : val.itemCode.includes(itemId)
                  )}
                />
              </Grid>
              <Grid item xs={12} alignItems="flex-end">
                <Button
                  onClick={() => {
                    dispatch(
                      billingItems(
                        store
                          ?.filter((val) =>
                            itemId.length == 0
                              ? val
                              : val.itemCode.includes(itemId)
                          )
                          .map((val) => {
                            if (val.itemCode === itemId)
                              return {
                                itemCode: val.itemCode,
                                itemName: val.itemName,
                                price: val.price,
                                quantity: quantity,
                                discount: discount,
                                sellingPrice: sellingPrice,
                              };
                          })
                      )
                    );
                  }}
                  size="large"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add Item
                </Button>
              </Grid>
            </>
          ) : (
            <>false</>
          )}
        </Grid>
      </Box>
    );
  else return "fetching data";
}
