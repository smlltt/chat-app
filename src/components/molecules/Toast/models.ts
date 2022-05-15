import { AlertColor } from "@mui/material";

export interface ToastProps {
  type: AlertColor;
  adHocContent?: string;
  handleClose: () => void;
}

export enum ToastTypeEnum {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}
