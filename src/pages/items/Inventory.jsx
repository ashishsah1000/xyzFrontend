import { Input, Button, Typography, setRef } from "@mui/material";
import { Box, Container, Grid, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { RefreshOutlined } from "@mui/icons-material";
import { CreateItem, ItemsTable, EditItem } from "../../components/items";

import { storeItems } from "../../features/items/itemsSlice";
import { getAllItems } from "../../Axios/items";
import { useDispatch, useSelector } from "react-redux";
import { Fade } from "@mui/material";
import { checkLoggedIn } from "../../Axios/user";

// styling for modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: "60vw",
  height: "80vh",
  padding: "20px 20px",
  background: "ghostwhite",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function Inventory() {
  // opening for adding items modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // opening for adding updating modal
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  //  table key is used to refresh everytime new item is added
  const [tableKey, setTableKey] = useState(Math.random());
  // contains the main items that is passed as props to itemsTable
  const [items, setItems] = useState([]);

  const [controlAddItems, setcontrolAddItems] = useState(false);
  const dispatch = useDispatch(); //redux

  // edit item - get all the information and then call the ui element
  const [editId, seteditId] = useState(0);
  const [editName, seteditName] = useState("");
  const [editPrice, seteditPrice] = useState(100);
  function editData({ id, name, price }) {
    seteditId(id);
    seteditName(name);
    seteditPrice(price);
  }

  // get the data in this function
  const bgStyle = {
    background:
      "url('https://cdn.dribbble.com/users/2698098/screenshots/5957957/untitled-2-01_4x.jpg')",
    backgroundSize: "cover",
  };
  async function fetchData() {
    console.log("creating request");
    // get all the items from the Axios request
    let items = await getAllItems();
    // reverse it to show latest first
    let rarrayData = items.reverse();
    // let rarrayData = items;
    setItems(rarrayData);
    dispatch(storeItems(rarrayData));
    setTableKey(Math.random());
    console.log(rarrayData);
    if (items.length == 0)
      bgStyle = {
        background:
          "url('https://cdn.dribbble.com/users/2698098/screenshots/5957957/untitled-2-01_4x.jpg')",
        backgroundSize: "cover",
      };
  }
  useEffect(() => {
    // check if the user has logged in
    checkLoggedIn();
    fetchData();
  }, []);

  return (
    <div>
      <Container component="main" maxWidth="lg" style={{}}>
        <Grid container>
          <Grid item xs={12} lg={12}>
            <Box
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "right",
              }}
            >
              <LoadingButton
                variant="contained"
                endIcon={<RefreshOutlined />}
                loadingPosition="end"
                onClick={fetchData}
              >
                Refresh
              </LoadingButton>
              &nbsp;
              <Button color="warning" variant="contained" onClick={handleOpen}>
                Add Items
              </Button>
            </Box>
            <div style={{ marginTop: "-55px" }} align="center">
              {items.length <= 0 ? (
                <div
                  style={{
                    padding: "40px 40px",
                  }}
                >
                  <div>
                    <img
                      src="https://cdn.dribbble.com/users/2698098/screenshots/5957957/untitled-2-01_4x.jpg"
                      height="400px"
                    />
                  </div>
                  <br />

                  <div>
                    <Typography variant="h5" align="center" color="slategray">
                      No data added yet
                    </Typography>
                  </div>
                </div>
              ) : (
                <ItemsTable key={tableKey} items={items} />
              )}
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
      {/* modal for updating items */}
      <div>
        <Modal
          open={openUpdate}
          onClose={handleCloseUpdate}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditItem name={editName} id={editId} price={editPrice} />
          </Box>
        </Modal>
      </div>
    </div>
  );
}
