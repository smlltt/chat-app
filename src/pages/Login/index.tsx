import React from "react";
import { FormikValues } from "formik";
import LoginComponent from "./Login.component";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "hooks";
import { ToastTypeEnum } from "components/molecules/Toast/models";
import { auth, db } from "config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import routes from "routes";

const Login = () => {
  const navigate = useNavigate();
  const { handleToast } = useToast();

  const handleSubmit = async (
    values: FormikValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const { email, password } = values;
    try {
      const signInResult = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = signInResult.user.uid;
      await updateDoc(doc(db, "users", uid), {
        isOnline: true,
      });
      handleToast(ToastTypeEnum.SUCCESS);
      navigate(routes.home);
    } catch (err: any) {
      handleToast(ToastTypeEnum.ERROR, err.message);
      setSubmitting(false);
    }
  };
  return <LoginComponent handleSubmit={handleSubmit} />;
};

export default Login;
