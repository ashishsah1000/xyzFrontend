import { TextField, Button, Typography } from "@mui/material";
import { Box, Container, Grid, Stack, Snackbar, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { getUser } from "../../setStorage/localUser";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useSelector } from "react-redux";

// table to show the data when entering already pressent item
import BasicTable from "./table/BasicTable";

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

export default function CreateItem({ fetchData }) {
  // for the mui snackbar
  const [snackSuccess, setSnackSuccess] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = snackSuccess;
  const handleClick = (newState) => () => {
    setSnackSuccess({ open: true, ...newState });
  };
  const handleClose = () => {
    setSnackSuccess({ ...snackSuccess, open: false });
  };

  //  the form section data for each input
  const [ItemName, setItemName] = useState("This is normal Text");
  const [ItemId, setItemId] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("other");
  const [description, setDescription] = useState(0);

  // switch for adding existing item
  const [existingItemSwitch, setexistingItemSwitch] = useState(false);

  // redux itemsData this will be used for sending to basicTable
  const itemsData = useSelector((state) => state.items.value.payload);

  const addItem = ({ close }) => {
    console.log("datas are: ", ItemName, "Id is ", ItemId);
    let dataLocal = getUser();
    console.log(dataLocal);
    let item = {};
    if (existingItemSwitch) {
      item = {
        user_id: dataLocal.payload.id,
        item: {
          itemName: ItemName,
          itemCode: ItemId,
          stock: stock,
        },
      };
    } else {
      item = {
        user_id: dataLocal.payload.id,
        item: {
          itemName: ItemName,
          itemCode: ItemId,
          price: price,
          stock: stock,
          category: category,
          description: description,
        },
      };
    }

    console.log(item);
    Axios({
      method: "POST",
      data: item,
      withCredentials: true,
      url: "http://localhost:4000/items/createProduct",
    }).then((res) => {
      console.log(res.data);

      fetchData();
      setSnackSuccess({ open: true }); // for the snackbar
    });
  };

  return (
    <div>
      <Snackbar
        style={{ background: "green", color: "white" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Success added the input"
      ></Snackbar>
      <Box>
        <Typography variant="h5">Add items to store</Typography>
        <br />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    onClick={() => {
                      setexistingItemSwitch(!existingItemSwitch);
                    }}
                  />
                }
                label="New Item"
              />
            </FormGroup>
          </Grid>
          {existingItemSwitch ? (
            <>
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
                  variant="outlined"
                  onChange={(e) => {
                    setStock(e.target.value);
                  }}
                  type="number"
                  label="Number of Stock"
                  fullWidth="100%"
                />
              </Grid>
            </>
          ) : (
            <>
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
                    setPrice(e.target.value);
                  }}
                  fullWidth="100%"
                  type="text"
                  label="price"
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
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  id="outlined-select"
                  select
                  label="Select Category"
                  value={category}
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
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <Button
              size="large"
              onClick={addItem}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Item
            </Button>
          </Grid>
          <Grid items xs={12}>
            {existingItemSwitch ? (
              <BasicTable
                items={itemsData.filter((val) =>
                  ItemId.length == 0 ? val : val.itemCode.includes(ItemId)
                )}
                search={"some"}
              />
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
