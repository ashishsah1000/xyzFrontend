import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Logout() {
  const [status, setstatus] = useState("Logging You Out");
  axios({
    method: "POST",
    withCredentials: true,
    url: "http://localhost:4000/user/logout",
  }).then((res) => {
    console.log(res);
    setstatus(res.data);
  });

  useEffect(() => {});

  return (
    <div>
      Loging out screen response:
      <div className="status">{status}</div>
    </div>
  );
}
