import * as yup from "yup";
import { FieldRequired } from "consts";

const useValidationSchema = () =>
  yup.object({
    email: yup.string().email("Enter your email").required(FieldRequired),
    password: yup.string().required(FieldRequired),
  });

export default useValidationSchema;
