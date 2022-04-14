import { Input, Button, Typography } from "@mui/material";
import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { getUser } from "../../setStorage/localUser";
import { CreateItem } from "../../components/items";

export default function Inventory() {
  return (
    <div>
      <Container component="main" maxWidth="lg" style={{ background: "" }}>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <CreateItem />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h4">This will contain data grid</Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
