import { useCallback, useContext } from "react";

import React, { FC, createContext, useState } from "react";
import { ToastTypeEnum } from "components/molecules/Toast/models";
import { Toast } from "components/molecules";

export type ToastState = {
  handleToast: (toastType: ToastTypeEnum, content?: string) => void;
};

const DEFAULT_STATE = {
  handleToast: () => {},
};

const ToastContext = createContext<ToastState>(DEFAULT_STATE);

export const ToastContextProvider: FC = ({ children }) => {
  const [showToast, setShowToast] = useState<null | ToastTypeEnum>(null);
  const [adHocContent, setAdHocContent] = useState<undefined | string>(
    undefined
  );

  const handleToast = useCallback((type: ToastTypeEnum, content?: string) => {
    setShowToast(type);
    setAdHocContent(content);
  }, []);

  const handleClose = () => {
    setShowToast(null);
    setAdHocContent(undefined);
  };
  return (
    <ToastContext.Provider
      value={{
        handleToast,
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

const useToast = (): ToastState => useContext(ToastContext);

export default useToast;
