import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Register, Login } from "pages";
import Navbar from "components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
