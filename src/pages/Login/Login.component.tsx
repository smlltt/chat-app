import React, { FC } from "react";
import { Stack, TextField, Container, Typography } from "@mui/material";
import { FormikValues, useFormik } from "formik";
import useValidationSchema from "./useValidation";
import LoadingButton from "@mui/lab/LoadingButton";

interface LoginComponentProps {
  handleSubmit: (
    values: FormikValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => void;
}

const LoginComponent: FC<LoginComponentProps> = ({ handleSubmit }) => {
  const validationSchema = useValidationSchema();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit(values, setSubmitting);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Container maxWidth={"sm"}>
        <Stack direction={"column"} spacing={2} mt={20}>
          <Typography variant={"h4"} alignSelf={"center"} mb={3}>
            Login
          </Typography>
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
          <LoadingButton
            color="primary"
            variant="contained"
            type="submit"
            loading={formik.isSubmitting}
          >
            Login
          </LoadingButton>
        </Stack>
      </Container>
    </form>
  );
};

export default LoginComponent;
