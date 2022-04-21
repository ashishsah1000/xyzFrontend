import { Input, Button, Typography, setRef } from "@mui/material";
import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { RefreshOutlined } from "@mui/icons-material";
import { CreateItem, ItemsTable } from "../../components/items";

import { storeItems } from "../../features/items/itemsSlice";
import { getAllItems } from "../../Axios/items";
import { useDispatch, useSelector } from "react-redux";


export default function Inventory() {
  const [tableKey, setTableKey] = useState(Math.random());
  const [items,setItems] = useState([]);
  const dispatch =  useDispatch()
 
  // get the data in this function
  async function fetchData() {
    let items = await getAllItems();
    let rarrayData = items.items.reverse();
    setItems(rarrayData);
    dispatch(storeItems(rarrayData));
    setTableKey(Math.random());

  }
  useEffect(()=>{
    fetchData();
  },[])

  if(items.length<=0)
      return(
        <div>Fetching data</div>
      )
  
  return (

    <div>
      <Container component="main" maxWidth="lg" style={{ background: "" }}>
      <Box style={{ marginTop: "10px" }}>
          <LoadingButton
            variant="contained"
            endIcon={<RefreshOutlined />}
            loadingPosition="end"
            onClick={fetchData}
          >
            Refresh
          </LoadingButton>
          &nbsp;
          <Button color="warning" variant="contained" >
            Add Items
          </Button>
        </Box>
        <Grid container>
          <Grid item xs={12} lg={8}>
            <ItemsTable key={tableKey} items={items}/>
          </Grid>
          <Grid item xs={12} lg={4}>
            <CreateItem fetchData={fetchData} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
