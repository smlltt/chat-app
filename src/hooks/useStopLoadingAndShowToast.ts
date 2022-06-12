import { useToast } from "./index";
import { ToastTypeEnum } from "components/molecules/Toast/models";
import { useCallback } from "react";

const useStopLoadingAndShowToast = (setLoading: (value: boolean) => void) => {
  const { handleToast } = useToast();

  return useCallback((toastType: ToastTypeEnum, message?: string) => {
    handleToast(toastType, message);
    setLoading(false);
  }, []);
};

export default useStopLoadingAndShowToast;
