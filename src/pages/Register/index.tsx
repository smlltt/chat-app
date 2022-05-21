import React from "react";
import { FormikValues } from "formik";
import RegisterComponent from "./Register.component";
import { useToast } from "hooks";
import { ToastTypeEnum } from "components/molecules/Toast/models";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import routes from "routes";
import { ApiFirebase } from "api";

const Register = () => {
  const navigate = useNavigate();
  const { handleToast } = useToast();

  const handleSubmit = async (
    values: FormikValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const { email, password, name } = values;
    try {
      const registrationResult = await ApiFirebase.createUser(email, password);
      const uid = registrationResult.user.uid;
      await ApiFirebase.createDocument("users", uid, {
        uid,
        name,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      handleToast(ToastTypeEnum.SUCCESS);
      navigate(routes.home);
    } catch (err: any) {
      handleToast(ToastTypeEnum.ERROR, err.message);
      setSubmitting(false);
    }
  };
  return <RegisterComponent handleSubmit={handleSubmit} />;
};

export default Register;
