import React, { FC } from "react";
import { Stack, Button, TextField, Container, Typography } from "@mui/material";
import { FormikValues, useFormik } from "formik";
import useValidationSchema from "./useValidation";

interface RegisterComponentProps {
  handleSubmit: (values: FormikValues) => void;
}

const RegisterComponent: FC<RegisterComponentProps> = ({ handleSubmit }) => {
  const validationSchema = useValidationSchema();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      userName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Container maxWidth={"sm"}>
        <Stack direction={"column"} spacing={2} mt={20}>
          <Typography variant={"h4"} alignSelf={"center"} mb={3}>
            Register
          </Typography>
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

export default RegisterComponent;
