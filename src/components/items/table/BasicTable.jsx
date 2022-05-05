import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ items }) {
  return (
    <TableContainer component={Paper} style={{ maxHeight: "300px" }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>S NO</TableCell>
            <TableCell>ITEM ID</TableCell>
            <TableCell>NAME</TableCell>
            <TableCell>STOCK</TableCell>
            <TableCell>PRICE</TableCell>
            <TableCell>CREATED ON</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row, i) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell>{row.itemCode}</TableCell>
              <TableCell>{row.itemName}</TableCell>
              <TableCell>{row.stock}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.createdOn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
