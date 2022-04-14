import React from "react";
import Layout from "../components/Layout";
import Inventory from "./items/Inventory";

export default function Homepage() {
  return (
    <div>
      <Layout midElement={<Inventory />} />
    </div>
  );
}
