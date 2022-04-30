import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Route, Routes } from "react-router-dom";
import { checkLoggedIn } from "../Axios/user";
import { useNavigate } from "react-router-dom";

export default function Homepage({ element }) {
  let navigate = new useNavigate();
  const [first, setfirst] = useState("second");
  const checker = async () => {
    const check = await checkLoggedIn();
    if (check == false) {
      navigate("/login");
    } else {
      console.log(
        "🚀 ~ file: Homepage.jsx ~ line 21 ~ checker ~ checker",
        checker
      );
      navigate("/billing");
    }
    return check;
  };

  useEffect(() => {
    const check = checker();
  }, []);
  return (
    <div>
      <Layout midElement={element} />
    </div>
  );
}
