import React, { FC } from "react";
import { Snackbar, Alert } from "@mui/material";
import { ToastProps } from "./models";
import { getToastContent } from "utils";

const Toast: FC<ToastProps> = ({ type, adHocContent, handleClose }) => {
  return (
    <Snackbar open={!!type} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {getToastContent(type, adHocContent)}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
