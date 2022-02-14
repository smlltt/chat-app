import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Stack direction="row" spacing={5}>
            <Link to={"/register"} style={{ textDecoration: "none" }}>
              <Typography color={"white"}>Register</Typography>
            </Link>
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <Typography color={"white"}>Login</Typography>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
