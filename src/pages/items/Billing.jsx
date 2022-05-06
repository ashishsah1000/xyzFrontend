import React from "react";
import { Grid, Box } from "@mui/material";
import { CreateBill, Bill } from "../../components";

export default function Billing() {
  return (
    <div style={{ height: "100%", width: "100%", background: "" }}>
      <Grid container>
        <Grid item xs={4} style={{ padding: "20px 20px" }} alignItems="center">
          <CreateBill />
        </Grid>
        <Grid item xs={4} style={{ padding: "20px 20px" }} alignItems="center">
          <Bill />
        </Grid>
        <Grid item xs={4}>
          Three
        </Grid>
      </Grid>
    </div>
  );
}
