import React from "react";
import { Stack, Button, TextField, Box, Container } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { FieldRequired } from "../../constants";

const validationSchema = yup.object({
  userName: yup.string().required(FieldRequired),
  email: yup.string().email("Enter a valid email").required(FieldRequired),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required(FieldRequired),
});

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      userName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Container maxWidth={"sm"}>
        <Stack direction={"column"} spacing={2} mt={20}>
          <TextField
            id="userName"
            name="userName"
            label="Username"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
            placeholder={"Username"}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            placeholder={"Email"}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            placeholder={"Password"}
          />
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Container>
    </form>
  );
};

export default Register;
