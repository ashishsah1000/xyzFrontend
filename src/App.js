import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login, Signup } from "./pages";

function App() {
  return (
    <div className="App">
      {/* declare all the routes */}
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
      {/* <Login /> */}
    </div>
  );
}

export default App;
