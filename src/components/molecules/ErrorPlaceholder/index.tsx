import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import React from "react";
import { Stack, Typography } from "@mui/material";

const ErrorPlaceholder = () => {
  return (
    <Stack alignItems="center" spacing={2} padding={1}>
      <ErrorOutlineIcon fontSize={"large"} color={"primary"} />
      <Typography>Something went wrong. Try again later</Typography>
    </Stack>
  );
};

export default ErrorPlaceholder;
