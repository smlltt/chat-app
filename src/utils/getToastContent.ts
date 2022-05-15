import { AlertColor } from "@mui/material";
import { ToastTypeEnum } from "components/molecules/Toast/models";

const getToastContent = (type: AlertColor, adHocContent?: string) => {
  switch (type) {
    case ToastTypeEnum.SUCCESS:
      return adHocContent ? adHocContent : "The operation was successful";
    case ToastTypeEnum.ERROR:
      return adHocContent ? adHocContent : "Something went wrong";
    case ToastTypeEnum.WARNING:
      return adHocContent ? adHocContent : "Warning";
    case ToastTypeEnum.INFO:
      return adHocContent ? adHocContent : "Info";
    default:
      return adHocContent ? adHocContent : "Info";
  }
};

export default getToastContent;
