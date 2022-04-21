import React, { useCallback, useEffect, useState } from "react";
import { Button, TextField, Box, IconButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllItems } from "../../../Axios/items";
import { SearchRounded, EditRounded } from "@mui/icons-material";
import { DeleteOutlineRounded } from "@mui/icons-material";
import { RefreshOutlined } from "@mui/icons-material";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ItemsTables() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let rerenderElemet = true;

  // getAllItems().then((res) => {
  //   console.log("got data", res);
  //   setData(res);
  // });
  async function fetchData() {
    setRefresh(true);
    let items = await getAllItems();
    console.log("data here", items);
    let rarrayData = items.items.reverse();
    // setData(items.items);
    setData(rarrayData);
    setRefresh(false);
  }
  useEffect(() => {
    let items = [];

    fetchData();
  }, [rerenderElemet]);
  if (data.length == 0) return "loading data";

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Box style={{ marginTop: "10px" }}>
          <LoadingButton
            variant="contained"
            onClick={fetchData}
            endIcon={<RefreshOutlined />}
            loading={refresh}
            loadingPosition="end"
            variant="contained"
          >
            Refresh
          </LoadingButton>
          &nbsp;
          <Button color="warning" variant="contained" onClick={fetchData}>
            Add Items
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <SearchRounded sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Search"
            variant="standard"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Box>
      </div>
      <br />
      <TableContainer
        component={Paper}
        style={{ height: "80vh", overflow: "hidden", overflowY: "scroll" }}
      >
        <Table
          sx={{
            width: "100%",
            maxHeight: "80vh",
            overflow: "hidden",
            overflowY: "scroll",
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>S.N O</StyledTableCell>
              <StyledTableCell>ITEM ID</StyledTableCell>

              <StyledTableCell>ITEM NAME</StyledTableCell>
              <StyledTableCell align="right">PRICE</StyledTableCell>
              <StyledTableCell align="right">DATE ADDED</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.filter((val) => {
                if (search.length == 0) return val;
                else if (
                  val.itemName.toLowerCase().includes(search.toLowerCase()) ||
                  val.itemCode.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((row, i) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.itemCode}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.itemName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.price}</StyledTableCell>
                  <StyledTableCell align="right">
                    {moment(
                      row.createdOn.split("T")[0].split("-").join(""),
                      "YYYYMMDD"
                    ).fromNow()}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton color="primary" aria-label="add an alarm">
                      <EditRounded />
                    </IconButton>
                    <IconButton color="secondary" aria-label="add an alarm">
                      <DeleteOutlineRounded />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}