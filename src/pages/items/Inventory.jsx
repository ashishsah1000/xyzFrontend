import { Input, Button, Typography, setRef } from "@mui/material";
import { Box, Container, Grid,Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { RefreshOutlined } from "@mui/icons-material";
import { CreateItem, ItemsTable } from "../../components/items";

import { storeItems } from "../../features/items/itemsSlice";
import { getAllItems } from "../../Axios/items";
import { useDispatch, useSelector } from "react-redux";
import { Fade } from "@mui/material";


  // styling for modal
  const style = {
    position : 'absolute',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%)',
    width:"60vw",
    height:"80vh",
    padding:"20px 20px",
    background:'ghostwhite',border:'2px solid #fff',boxShadow:24,p:4,borderRadius:"10px"
  
  }

export default function Inventory() {
  // opening for adding items modal
  const [open,setOpen] = React.useState(false);
  const handleOpen = ()=> setOpen(true)
  const handleClose = ()=> setOpen(false)


//  table key is used to refresh everytime new item is added 
  const [tableKey, setTableKey] = useState(Math.random());
  // contains the main items that is passed as props to itemsTable
  const [items, setItems] = useState([]);

  const [controlAddItems, setcontrolAddItems] = useState(false);
  const dispatch = useDispatch();  //redux

  // get the data in this function
  async function fetchData() {
    

    // get all the items from the Axios request
    let items = await getAllItems();
    // reverse it to show latest first
    let rarrayData = items.items.reverse();
    setItems(rarrayData);
    dispatch(storeItems(rarrayData));
    setTableKey(Math.random());
  }
  useEffect(() => {
    fetchData();
  }, []);

  if (items.length <= 0) return <div>Fetching data</div>;

  return (
    <div>
      <Container component="main" maxWidth="lg" style={{ background: "" }}>
        <Grid container>
          <Grid item xs={12} lg={12}>
            <Box style={{ marginTop: "10px",display:"flex",justifyContent:"right"}}>
              <LoadingButton
                variant="contained"
                endIcon={<RefreshOutlined />}
                loadingPosition="end"
                onClick={fetchData}
              >
                Refresh
              </LoadingButton>
              &nbsp;
              <Button
                color="warning"
                variant="contained"
                onClick={handleOpen}
              >
                Add Items
              </Button>
            </Box>
            <div style={{marginTop:"-55px"}}>
            <ItemsTable key={tableKey} items={items}  />

            </div>
          </Grid>
          {/* <Grid item xs={12} lg={4} sx={{ padding: "20px 20px" }}>
          </Grid> */}
        </Grid>
      </Container>

      {/* modal for adding items */}
      <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
                  <CreateItem fetchData={fetchData} />
                </Box>

        </Modal>
      </div>
    </div>
  );
}
