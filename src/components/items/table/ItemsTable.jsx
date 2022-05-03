import React, { useCallback, useEffect, useState } from "react";

// all the material ui components
import { Button, TextField, Box, IconButton, Input } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { SearchRounded, EditRounded } from "@mui/icons-material";
import { DeleteOutlineRounded } from "@mui/icons-material";
//  moment js
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import { selectedItems } from "../../../features/items/itemsSlice"; //redux action to slecte items

// axios
import { removeProduct } from "../../../Axios/items";

// importing snackbar
import Notify from "../../snackbar/Notify";

// styling for the table

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

// main function

export default function ItemsTables({ items, handleOpenUpdate }) {
  const [data, setData] = useState([]); // this is for displaying data in tables
  const [search, setSearch] = useState([]); //for live search
  // const [edit, setEdit] = useState(false);  was supposed to be inline edit

  //  call the snackbar
  const [callSnackbar, setcallSnackbar] = useState(false);
  const handleClickSnackbar = () => {
    setcallSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setcallSnackbar(false);
  };
  // snackbar code ends here

  // set up the redux dispatch
  const dispatch = useDispatch();
  // delete item function
  const removeItem = async (id) => {
    // does a call from api
    await removeProduct({ _id: id });
    handleClickSnackbar();
  };

  // handleEdit function send data to redux for handeling edit of that item
  const handleEdit = (_id, itemCode, name, price) => {
    // get clicked item details  }
    const selectedItem = {
      _id: _id,
      code: itemCode,
      name: name,
      price: price,
    };
    dispatch(selectedItems(selectedItem));
    handleOpenUpdate();
  };

  // when edit mode is on show input with data else use text

  useEffect(() => {
    console.log(items);
    setData(items);
  }, []);
  if (data.length == 0) return "loading data";

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
              <StyledTableCell align="left">PRICE</StyledTableCell>
              <StyledTableCell align="left">DATE ADDED</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!data &&
              data.length > 0 &&
              data
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
                  <StyledTableRow key={i + 1}>
                    <StyledTableCell component="th" scope="row">
                      {i + 1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {/* {!edit?} */}
                      {row.itemCode}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.itemName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Rs {row.price}</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {moment(
                        row.createdOn.split("T")[0].split("-").join(""),
                        "YYYYMMDD"
                      ).fromNow()}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <IconButton
                        color="primary"
                        aria-label="add an alarm"
                        onClick={() =>
                          handleEdit(
                            row._id,
                            row.itemCode,
                            row.itemName,
                            row.price
                          )
                        }
                      >
                        <EditRounded />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        aria-label="add an alarm"
                        onClick={() => {
                          removeItem(row._id);
                        }}
                      >
                        <DeleteOutlineRounded />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {callSnackbar ? (
        <Notify
          handleClick={handleClickSnackbar}
          handleClose={handleCloseSnackbar}
          open={callSnackbar}
          type="warning"
          message="Item was deleted successfully"
        />
      ) : (
        <> </>
      )}
    </>
  );
}
