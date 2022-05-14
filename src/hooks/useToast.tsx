import { useContext } from "react";
import { ToastState } from "contexts/ToastContext";
import { ToastContext } from "contexts";

const useToast = (): ToastState => useContext(ToastContext);

export default useToast;
