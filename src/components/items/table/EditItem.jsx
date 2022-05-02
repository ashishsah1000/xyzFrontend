import React, { useState } from "react";
import { Box, Typography, Grid, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { updateItem } from "../../../Axios/items";

export default function EditItem({
  id = 100,
  name = "some name",
  price = "100",
  _id = "some string",
}) {
  // loading while updating
  const [loading, setLoading] = useState(false);

  //  the form section data for each input
  const [ItemName, setItemName] = useState(name);
  const [ItemId, setItemId] = useState(id);
  const [ItemPrice, setItemPrice] = useState(price);

  const updateData = async () => {
    setLoading(true);

    const item = {
      _id: _id,
      code: ItemId,
      price: ItemPrice,
      name: ItemName,
    };
    const res = await updateItem(item);
    setLoading(false);
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
              defaultValue={id}
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
    </>
  );
}
