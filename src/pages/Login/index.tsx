import React, { useEffect } from "react";
import { FormikValues } from "formik";
import LoginComponent from "./Login.component";
import { useAuth, useToast } from "hooks";
import { ToastTypeEnum } from "components/molecules/Toast/models";
import { useNavigate } from "react-router-dom";
import routes from "routes";
import { ApiFirebase } from "api";

const Login = () => {
  const navigate = useNavigate();
  const { handleToast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (
    values: FormikValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const { email, password } = values;
    try {
      const signInResult = await ApiFirebase.signIn(email, password);
      const uid = signInResult.user.uid;
      await ApiFirebase.updateDocument("users", uid, { isOnline: true });
      handleToast(ToastTypeEnum.SUCCESS);
      navigate(routes.home);
    } catch (err: any) {
      handleToast(ToastTypeEnum.ERROR, err.message);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (user?.uid) navigate(routes.home);
  }, [user]);

  return <LoginComponent handleSubmit={handleSubmit} />;
};

export default Login;
