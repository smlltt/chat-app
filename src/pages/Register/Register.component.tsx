import React, { FC } from "react";
import { Stack, Button, TextField, Container, Typography } from "@mui/material";
import { FormikValues, useFormik } from "formik";
import useValidationSchema from "./useValidation";

interface RegisterComponentProps {
  handleSubmit: (
    values: FormikValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => void;
}

const RegisterComponent: FC<RegisterComponentProps> = ({ handleSubmit }) => {
  const validationSchema = useValidationSchema();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
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
            Register
          </Typography>
          <TextField
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            placeholder={"Name"}
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
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Submit
          </Button>
        </Stack>
      </Container>
    </form>
  );
};

export default RegisterComponent;
