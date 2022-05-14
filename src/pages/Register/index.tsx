import React from "react";
import { FormikValues } from "formik";
import RegisterComponent from "./Register.component";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "config/firebase";
import { useToast } from "hooks";
import { ToastTypeEnum } from "components/molecules/Toast/models";

const Register = () => {
  const { setShowToast, setAdHocContent } = useToast();

  const handleSubmit = async (values: FormikValues) => {
    const { email, password } = values;
    try {
      const registrationResult = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (registrationResult) {
        setShowToast(ToastTypeEnum.SUCCESS);
        //  TODO add redirect
      }
    } catch (err: any) {
      setShowToast(ToastTypeEnum.ERROR);
      setAdHocContent(err.message);
    }
  };
  return <RegisterComponent handleSubmit={handleSubmit} />;
};

export default Register;
