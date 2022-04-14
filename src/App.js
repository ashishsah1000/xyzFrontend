import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Login,
  Signup,
  Logout,
  Inventory,
  Homepage,
  Billing,
  History,
} from "./pages";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./features/user/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "./setStorage/localUser";

function App() {
  const user = useSelector((state) => state.auth);
  console.log(getUser());
  let navigate = useNavigate();

  useEffect(() => {
    if (getUser() == null) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="App">
      {/* declare all the routes */}
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/homepage" element={<Homepage />} />
        <Route exact path="*" element={<Homepage element={<Billing />} />} />
        <Route
          exact
          path="/inventory"
          element={<Homepage element={<Inventory />} />}
        />
        <Route
          exact
          path="/inventory"
          element={<Homepage element={<Inventory />} />}
        />
      </Routes>
      {/* <Login /> */}
    </div>
  );
}

export default App;
