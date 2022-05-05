import React, { useState } from "react";
import { Box, Typography, Grid, TextField, MenuItem } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { updateItem } from "../../../Axios/items";

// import the snackbar
import Notify from "../../snackbar/Notify";

// this options will created by database as per user requirment
const categoryOption = [
  {
    value: "maleJeans",
    label: "Jeans | Male",
  },
  {
    value: "femaleJeans",
    label: "Jeans | Male",
  },
  {
    value: "femaleTop",
    label: "Top | Female",
  },
  {
    value: "maleTshirt",
    label: "T-Shirt | Male",
  },
];

export default function EditItem({
  id = 100,
  name = "some name",
  price = "100",
  _id = "some string",
  stock = 0,
  description = "",
  category = "",
  fetchData = () => {},
}) {
  // loading while updating
  const [loading, setLoading] = useState(false);

  //  the form section data for each input
  const [ItemName, setItemName] = useState(name);
  const [ItemId, setItemId] = useState(id);
  const [ItemPrice, setItemPrice] = useState(price);
  const [ItemStock, setStock] = useState(stock);
  const [ItemCategory, setCategory] = useState(category);
  const [ItemDescription, setDescription] = useState(description);

  //  call the snackbar
  const [callSnackbar, setcallSnackbar] = useState(false);
  const handleClickSnackbar = () => {
    setcallSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setcallSnackbar(false);
  };
  // snackbar code ends here

  const updateData = async () => {
    setLoading(true);

    const item = {
      _id: _id,
      code: ItemId,
      price: ItemPrice,
      name: ItemName,
      stock: ItemStock,
      description: ItemDescription,
      category: ItemCategory,
    };
    const res = await updateItem(item);
    setLoading(false);
    handleClickSnackbar();
    fetchData();
  };

  return (
    <>
      <Box>
        <AppRegistrationIcon fontSize="large" color="warning" />
        <Typography variant="h5">
          {" "}
          <b>Updating item :</b> {ItemName}
        </Typography>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              onChange={(e) => {
                setItemName(e.target.value);
              }}
              type="text"
              defaultValue={name}
              label="Please enter the name of item"
              fullWidth="100%"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={id}
              disabled
              onChange={(e) => {
                setItemId(e.target.value);
              }}
              type="text"
              label="Please enter the ID of item"
              fullWidth="100%"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => {
                setItemPrice(e.target.value);
              }}
              fullWidth="100%"
              type="number"
              label="price"
              defaultValue={price}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              onChange={(e) => {
                setStock(e.target.value);
              }}
              type="number"
              label="Number of Stock"
              fullWidth="100%"
              defaultValue={stock}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              id="outlined-select"
              select
              label="Select Category"
              defaultValue={category}
              fullWidth="100%"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {categoryOption.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              type="text"
              label="Add some description for new item"
              fullWidth="100%"
              defaultValue={description}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              color="warning"
              loading={loading}
              variant="contained"
              endIcon={<PublishedWithChangesIcon />}
              loadingPosition="end"
              onClick={updateData}
            >
              Update Item
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
      {callSnackbar ? (
        <Notify
          handleClick={handleClickSnackbar}
          handleClose={handleCloseSnackbar}
          open={callSnackbar}
          type="success"
          message="Item was updated successfully"
        />
      ) : (
        <> </>
      )}
    </>
  );
}
