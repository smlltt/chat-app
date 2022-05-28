import {useToast} from "./index";
import {ToastTypeEnum} from "components/molecules/Toast/models";

const useStopLoadingAndShowToast = () => {
    const { handleToast } = useToast();
    const stopLoadingAndShowToast = (setLoading:  React.Dispatch<React.SetStateAction<boolean>>, toastType: ToastTypeEnum, message?: string) => {
        handleToast(toastType, message);
        setLoading(false)
    }
    return { stopLoadingAndShowToast };
}

export default useStopLoadingAndShowToast;