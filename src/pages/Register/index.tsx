import React from "react";
import { FormikValues } from "formik";
import RegisterComponent from "./Register.component";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "config/firebase";

const Register = () => {
  const handleSubmit = async (values: FormikValues) => {
    const { email, password } = values;
    try {
      const registrationResult = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("registrationResult", registrationResult);
    } catch (err) {
      console.log("error", err);
    }
  };
  return <RegisterComponent handleSubmit={handleSubmit} />;
};

export default Register;
