import React, { FC } from "react";
import { Grid, GridProps, useMediaQuery, useTheme } from "@mui/material";

interface ChatsWrapperProps extends GridProps {}

const ChatsWrapper: FC<ChatsWrapperProps> = ({ children, ...rest }) => {
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid
      container
      item
      direction={"column"}
      height={`calc(100vh - ${isBigScreen ? "64px" : "56px"})`}
      sx={{ overflowY: "auto" }}
      {...rest}
    >
      {children}
    </Grid>
  );
};

export default ChatsWrapper;
