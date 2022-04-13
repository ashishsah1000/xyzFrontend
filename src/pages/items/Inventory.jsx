import { Input, Button } from "@mui/material";
import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function Inventory() {
  const [ItemName, setItemName] = useState("This is normal Text");
  const [ItemId, setItemId] = useState("This is normal Text of ID");
  const [price, setPrice] = useState(0);

  const addItem = () => {
    console.log("datas are: ", ItemName, "Id is ", ItemId);
    const item = {
      username: "Creatd Username" + Math.random() * 100,
      itemName: ItemName,
      itemCode: ItemId,
      price: price,
    };
    console.log(item);
    Axios({
      method: "POST",
      data: item,
      withCredentials: true,
      url: "http://localhost:4000/items/createProduct",
    }).then((res) => console.log(res));
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid item xs={12}>
            <Input
              onChange={(e) => {
                setItemName(e.target.value);
              }}
              type="text"
              placeholder="Please enter the name of item"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              onChange={(e) => {
                setItemId(e.target.value);
              }}
              type="text"
              placeholder="Please enter the ID of item"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              type="text"
              placeholder="price"
            />
          </Grid>
          <Button onClick={addItem} variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add Item
          </Button>
        </Box>
      </Container>
    </div>
  );
}
