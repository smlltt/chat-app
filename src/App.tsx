import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Register, Login } from "pages";
import Navbar from "components/Navbar";
import { ToastContextProvider } from "./contexts";

function App() {
  return (
    <BrowserRouter>
      <ToastContextProvider>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </ToastContextProvider>
    </BrowserRouter>
  );
}

export default App;
