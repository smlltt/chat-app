import React, { FC } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface NavbarItemProps {
  route: string;
  label: string;
}

const NavbarItem: FC<NavbarItemProps> = ({ route, label }) => (
  <Link to={route} style={{ textDecoration: "none" }}>
    <Typography color={"white"}>{label}</Typography>
  </Link>
);

export default NavbarItem;
