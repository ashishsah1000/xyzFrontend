import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../features/user/userSlice";
import { deleteUser } from "../setStorage/localUser";

export default function Logout() {
  const [status, setstatus] = useState("Logging You Out");
  const dispatch = useDispatch();

  axios({
    method: "POST",
    withCredentials: true,
    url: "http://localhost:4000/user/logout",
  }).then((res) => {
    console.log(res);
    setstatus(res.data);
    deleteUser();
    dispatch(logout);
  });

  useEffect(() => {});

  return (
    <div>
      Loging out screen response:
      <div className="status">{status}</div>
    </div>
  );
}
