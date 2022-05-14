import React, { FC, createContext, useState } from "react";
import { ToastTypeEnum } from "components/molecules/Toast/models";
import { Toast } from "components/molecules";

export type ToastState = {
  showToast: null | ToastTypeEnum;
  setShowToast: (toastType: ToastTypeEnum) => void;
  adHocContent: undefined | string;
  setAdHocContent: (content: string) => void;
};

const DEFAULT_STATE = {
  showToast: null,
  adHocContent: undefined,
  setShowToast: () => {},
  setAdHocContent: () => {},
};

export const ToastContext = createContext<ToastState>(DEFAULT_STATE);

const ToastContextProvider: FC = ({ children }) => {
  const [showToast, setShowToast] = useState<null | ToastTypeEnum>(null);
  const [adHocContent, setAdHocContent] = useState<undefined | string>(
    undefined
  );
  const handleClose = () => {
    setShowToast(null);
    setAdHocContent(undefined);
  };
  return (
    <ToastContext.Provider
      value={{
        showToast,
        setShowToast,
        adHocContent,
        setAdHocContent,
      }}
    >
      {children}
      {showToast && (
        <Toast
          type={showToast}
          adHocContent={adHocContent}
          handleClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;
