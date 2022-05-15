import React from "react";
import { FormikValues } from "formik";
import RegisterComponent from "./Register.component";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "config/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import routes from "routes";

const Register = () => {
  const navigate = useNavigate();
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
      navigate(routes.home);
    } catch (err) {
      console.log("error", err);
      setSubmitting(false);
    }
  };
  return <RegisterComponent handleSubmit={handleSubmit} />;
};

export default Register;
