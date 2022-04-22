import { TextField, Button, Typography } from "@mui/material";
import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { getUser } from "../../setStorage/localUser";

export default function CreateItem({ fetchData }) {
  const [ItemName, setItemName] = useState("This is normal Text");
  const [ItemId, setItemId] = useState("This is normal Text of ID");
  const [price, setPrice] = useState(0);

  const addItem = () => {
    console.log("datas are: ", ItemName, "Id is ", ItemId);
    let dataLocal = getUser();
    console.log(dataLocal);
    const item = {
      username: dataLocal.payload.username,
      items: [
        {
          itemName: ItemName,
          itemCode: ItemId,
          price: price,
        },
      ],
    };
    console.log(item);
    Axios({
      method: "POST",
      data: item,
      withCredentials: true,
      url: "http://localhost:4000/items/createProduct",
    }).then((res) => {
      console.log(res);
      fetchData();
    });
  };

  return (
    <Box style={{ }} sx={{padding: "40px 40px",boxShadow:" 1px 2px 28px -8px rgba(0,0,0,0.75)",borderRadius:"10px" }}>
        <Typography variant="h5" >Add items to store</Typography>
        <br />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
          variant="outlined"
            onChange={(e) => {
              setItemName(e.target.value);
            }}
            type="text"
            label="Please enter the name of item"
            fullWidth="100%"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
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
              setPrice(e.target.value);
            }}
            fullWidth="100%"
            type="text"
            label="price"
          />
        </Grid>
        <Grid item xs={12}>
          <Button size="large" onClick={addItem} variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add Item
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
