import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Stack } from "@mui/material";
import { NavbarItem } from "./molecules";
import routes from "routes";
import { auth } from "config/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "hooks";
import { ApiFirebase } from "api";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignout = async () => {
    const uid = auth.currentUser?.uid;
    uid &&
      (await ApiFirebase.updateDocument("users", uid, { isOnline: false }));
    await ApiFirebase.signOut();
    navigate(routes.login);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Stack direction="row" spacing={5} alignItems="center">
            {!!user ? (
              <>
                <NavbarItem route={routes.home} label={"Home"} />
                <NavbarItem route={routes.profile} label={"Profile"} />
                <NavbarItem
                  route={routes.login}
                  label={"Logout"}
                  handleClick={handleSignout}
                />
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
