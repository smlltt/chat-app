import * as yup from "yup";
import {FieldRequired} from "../../constants";

const useValidationSchema = () => yup.object({
    userName: yup.string().required(FieldRequired),
    email: yup.string().email("Enter a valid email").required(FieldRequired),
    password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required(FieldRequired),
});

export default useValidationSchema;