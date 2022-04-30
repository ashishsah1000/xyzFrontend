import { TextField, Button, Typography } from "@mui/material";
import { Box, Container, Grid, Stack, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { getUser } from "../../setStorage/localUser";
// import MuiAlert from "@material-ui/lab/Alert"

// const Alert = React.forwardRef(function Alert(props,ref){
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
// })

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
  const [ItemId, setItemId] = useState("This is normal Text of ID");
  const [price, setPrice] = useState(0);

  const addItem = ({ close }) => {
    console.log("datas are: ", ItemName, "Id is ", ItemId);
    let dataLocal = getUser();
    console.log(dataLocal);
    const item = {
      // username: dataLocal.payload.username,
      // items: [
      //   {
      //     itemName: ItemName,
      //     itemCode: ItemId,
      //     price: price,
      //   },
      // ],
      user_id: dataLocal.payload.id,
      item: {
        itemName: ItemName,
        itemCode: ItemId,
        price: price,
      },
    };
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
              defaultValue="100"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              fullWidth="100%"
              type="text"
              label="price"
            />
          </Grid>
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
        </Grid>
      </Box>
    </div>
  );
}
