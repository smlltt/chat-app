import React, { FC } from "react";
import { FirestoreError } from "firebase/firestore";
import { Box, CircularProgress } from "@mui/material";
import { ErrorPlaceholder } from "components/molecules";

interface LoadingAndErrorProps {
  loading?: boolean;
  error?: FirestoreError;
}

const LoadingAndError: FC<LoadingAndErrorProps> = ({ loading, error }) => (
  <Box display={"flex"} justifyContent={"center"} alignContent={"center"}>
    {loading && <CircularProgress />}
    {error && <ErrorPlaceholder />}
  </Box>
);

export default LoadingAndError;
