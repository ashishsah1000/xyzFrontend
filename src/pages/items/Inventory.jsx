import { Input, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Inventory() {
  const [ItemName, setItemName] = useState("This is normal Text");
  const [ItemId, setItemId] = useState("This is normal Text of ID");

  const addItem = () => {
    console.log("datas are: ", ItemName, "Id is ", ItemId);
  };

  return (
    <div>
      <Input
        onChange={(e) => {
          setItemName(e.target.value);
        }}
        type="text"
        placeholder="Please enter the name of item"
      />
      <Input
        onChange={(e) => {
          setItemId(e.target.value);
        }}
        type="text"
        placeholder="Please enter the ID of item"
      />
      <Button
        onClick={addItem}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Add Item
      </Button>
    </div>
  );
}
