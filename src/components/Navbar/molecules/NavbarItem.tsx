import React, { FC } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface NavbarItemProps {
  route: string;
  label: string;
  handleClick?: () => void;
}

const NavbarItem: FC<NavbarItemProps> = ({ route, label, handleClick }) => (
  <Link to={route} style={{ textDecoration: "none" }} onClick={handleClick}>
    <Typography color={"white"}>{label}</Typography>
  </Link>
);

export default NavbarItem;
