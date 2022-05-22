import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Register, Login } from "pages";
import Navbar from "components/Navbar";
import { ToastContextProvider, AuthProvider } from "hooks";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContextProvider>
          <Navbar />
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </ToastContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
