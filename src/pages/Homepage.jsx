import React from "react";
import Layout from "../components/Layout";
import { Route, Routes } from "react-router-dom";

export default function Homepage({ element }) {
  return (
    <div>
      <Layout midElement={element} />
    </div>
  );
}
