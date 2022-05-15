import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Button, Stack } from "@mui/material";
import { NavbarItem } from "./molecules";
import routes from "routes";
import { auth } from "config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    }
  });

  const handleSignout = async () => {
    await signOut(auth);
    setLoggedIn(false);
    navigate(routes.home);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Stack direction="row" spacing={5} alignItems="center">
            {loggedIn ? (
              <>
                <NavbarItem route={routes.profile} label={"Profile"} />
                <Button
                  variant="contained"
                  disableElevation
                  onClick={handleSignout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavbarItem route={routes.register} label={"Register"} />
                <NavbarItem route={routes.login} label={"Login"} />
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
