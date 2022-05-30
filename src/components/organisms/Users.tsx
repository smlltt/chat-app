import React from "react";
import { ApiFirebase } from "api";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth } from "config/firebase";
import {
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ErrorPlaceholder, User } from "components/molecules";

const Users = () => {
  const uid = auth.currentUser?.uid;
  const usersQuery = uid
    ? ApiFirebase.createQuery("users", "uid", "!=", uid)
    : undefined;
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const [users, loading, error] = useCollection(usersQuery);

  return (
    <Grid
      item
      xs={5}
      sm={4}
      direction={"column"}
      height={`calc(100vh - ${isBigScreen ? "64px" : "56px"})`}
      sx={{ overflowY: "auto" }}
    >
      {(loading || error) && (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
          mt={20}
        >
          {loading && <CircularProgress />}
          {error && <ErrorPlaceholder />}
        </Box>
      )}
      {users?.docs.map((doc) => (
        <User user={doc.data()} />
      ))}
    </Grid>
  );
};

export default Users;
