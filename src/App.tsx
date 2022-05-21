import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Register, Login } from "pages";
import Navbar from "components/Navbar";
import { ToastContextProvider, AuthProvider } from "hooks";
import { PrivateRoute } from "components";
import routes from "routes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
          </Routes>
        </ToastContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
