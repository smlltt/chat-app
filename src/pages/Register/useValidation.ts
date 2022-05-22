import * as yup from "yup";
import { FieldRequired } from "consts";

const useValidationSchema = () =>
  yup.object({
    name: yup.string().required(FieldRequired),
    email: yup.string().email("Enter a valid email").required(FieldRequired),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required(FieldRequired),
  });

export default useValidationSchema;
