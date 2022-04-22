import { Input, Button, Typography, setRef } from "@mui/material";
import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { RefreshOutlined } from "@mui/icons-material";
import { CreateItem, ItemsTable } from "../../components/items";

import { storeItems } from "../../features/items/itemsSlice";
import { getAllItems } from "../../Axios/items";
import { useDispatch, useSelector } from "react-redux";
import { Fade } from "@mui/material";

export default function Inventory() {
  const [tableKey, setTableKey] = useState(Math.random());
  const [items, setItems] = useState([]);
  const [controlAddItems, setcontrolAddItems] = useState(false);
  const dispatch = useDispatch();

  // get the data in this function
  async function fetchData() {
    let items = await getAllItems();
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
          <Grid item xs={12} lg={8}>
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
                onClick={() => {
                  setcontrolAddItems(!controlAddItems);
                }}
              >
                Add Items
              </Button>
            </Box>
            <div style={{marginTop:"-55px"}}>
            <ItemsTable key={tableKey} items={items}  />

            </div>
          </Grid>
          <Grid item xs={12} lg={4} sx={{ padding: "20px 20px" }}>
            {controlAddItems ? (
              <Fade in={controlAddItems}>
                <div>
                  <CreateItem fetchData={fetchData} />
                </div>
              </Fade>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
