import React, { useState } from "react";
import Layout from "../components/Layout";
import { Route, Routes } from "react-router-dom";

export default function Homepage({ element }) {
  const [first, setfirst] = useState("second");
  return (
    <div>
      <Layout midElement={element} />
    </div>
  );
}
