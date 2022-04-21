import { Input, Button, Typography } from "@mui/material";
import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import { CreateItem, ItemsTable } from "../../components/items";

export default function Inventory() {
  const [first, setfirst] = useState(null);
  return (
    <div>
      <Container component="main" maxWidth="lg" style={{ background: "" }}>
        <Grid container>
          <Grid item xs={12} lg={8}>
            <ItemsTable />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CreateItem />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
