import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Stack } from "@mui/material";
import { NavbarItem } from "./molecules";
import routes from "routes";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Stack direction="row" spacing={5}>
            <NavbarItem route={routes.register} label={"Register"} />
            <NavbarItem route={routes.login} label={"Login"} />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
