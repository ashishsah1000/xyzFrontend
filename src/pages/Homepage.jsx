import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Route, Routes } from "react-router-dom";
import { checkLoggedIn } from "../Axios/user";
import { useNavigate } from "react-router-dom";

// axios import
import { getAllItems } from "../Axios/items";

// redux import
import { useSelector, useDispatch } from "react-redux";
import { storeItems } from "../features/items/itemsSlice"; //redux action to store items

export default function Homepage({ element }) {
  let navigate = new useNavigate();
  const [first, setfirst] = useState("second");
  const checker = async () => {
    const check = await checkLoggedIn();
    if (check == false) {
      navigate("/login");
    } else {
      navigate("/billing");
    }
    return check;
  };

  let dispatch = useDispatch();
  async function StoreAllItemsRedux() {
    let items = await getAllItems();
    let rarrayData = items.reverse();
    console.log(rarrayData, "from homepage");
    dispatch(storeItems(rarrayData));
  }

  useEffect(() => {
    const check = checker();
    StoreAllItemsRedux();
  }, []);
  return (
    <div>
      <Layout midElement={element} />
    </div>
  );
}
