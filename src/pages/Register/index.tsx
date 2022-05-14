import React from "react";
import { FormikValues } from "formik";
import RegisterComponent from "./Register.component";

const Register = () => {
  const handleSubmit = (values: FormikValues) => {
    console.log(values);
  };
  return <RegisterComponent handleSubmit={handleSubmit} />;
};

export default Register;
