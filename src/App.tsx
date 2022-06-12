import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Register, Login, Profile } from "pages";
import Navbar from "components/Navbar";
import { ToastContextProvider, AuthProvider } from "hooks";
import { PrivateRoute } from "components";
import routes from "routes";
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
            <Route
              path={routes.home}
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path={routes.register} element={<Register />} />
              <Route path={routes.login} element={<Login />} />
            <Route
              path={routes.profile}
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            </Routes>
          </ToastContextProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
