import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Button, Stack } from "@mui/material";
import { NavbarItem } from "./molecules";
import routes from "routes";
import { auth, db } from "config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "hooks";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignout = async () => {
    const uid = auth.currentUser?.uid;
    uid &&
      (await updateDoc(doc(db, "users", uid), {
        isOnline: false,
      }));
    await signOut(auth);
    navigate(routes.login);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Stack direction="row" spacing={5} alignItems="center">
            {!!user ? (
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
