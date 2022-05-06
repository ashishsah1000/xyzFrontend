import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import BtableOne from "./BillingTables/BtableOne";

export default function ({ billNo = 12345, items }) {
  const date = new Date();
  return (
    <div>
      <Box
        sx={{
          height: "70vh",
          padding: "20px 20px",
          background: "white",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",

          flexDirection: "column",
        }}
      >
        <Typography variant="h5" align="center">
          <b> XYZ Store</b>
        </Typography>
        <Typography variant="span" justifyContent="center">
          **Your company logo**
        </Typography>
        <Box background="warning" sx={{ width: "100%", fontSize: "12px" }}>
          <p>
            <b>Bill NO :</b>
            {billNo}
          </p>
          <p>
            <b>Date :</b>
            {date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()}
          </p>
          <BtableOne />
        </Box>
      </Box>
    </div>
  );
}
