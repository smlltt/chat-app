import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Register, Login } from "pages";
import Navbar from "components/Navbar";
import { ToastContextProvider, AuthProvider } from "hooks";
import theme from "theme";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <ToastContextProvider>
            <Navbar />
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/register"} element={<Register />} />
              <Route path={"/login"} element={<Login />} />
            </Routes>
          </ToastContextProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
