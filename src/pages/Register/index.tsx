import React from "react";
import { FormikValues } from "formik";
import RegisterComponent from "./Register.component";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useToast } from "hooks";
import { ToastTypeEnum } from "components/molecules/Toast/models";
import { auth, db } from "config/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import routes from "routes";

const Register = () => {
  const navigate = useNavigate();
  const { handleToast } = useToast();

  const handleSubmit = async (
    values: FormikValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const { email, password, name } = values;
    try {
      const registrationResult = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = registrationResult.user.uid;
      await setDoc(doc(db, "users", uid), {
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
