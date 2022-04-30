import React, { useState } from "react";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";

export default function EditItem({
  id = 100,
  name = "some name",
  price = "100",
}) {
  //  the form section data for each input
  const [ItemName, setItemName] = useState("This is normal Text");
  const [ItemId, setItemId] = useState("This is normal Text of ID");
  const [ItemPrice, setItemPrice] = useState(0);

  return (
    <>
      <Box>
        <Typography variant="h5">Add items to store</Typography>
        <br />
        <Grid container spacing={1}>
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
              value="100"
              fullWidth="100%"
              type="text"
              label="price"
              defaultValue={price}
            />
          </Grid>
          <Grid item xs={12}>
            <Button size="large" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Update Item
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
