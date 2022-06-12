import React, { FC } from "react";
import { Box, CircularProgress } from "@mui/material";
import { ErrorPlaceholder, User } from "components/molecules";
import { FirestoreError, DocumentData } from "firebase/firestore";
import { ChatsWrapper } from "components/layouts";

interface UsersProps {
  loading: boolean;
  error: FirestoreError | undefined;
  users: DocumentData[] | undefined;
  handleUserClick: (user: DocumentData) => void;
}

const UsersComponent: FC<UsersProps> = ({
  loading,
  error,
  users,
  handleUserClick,
}) => {
  return (
    <ChatsWrapper xs={5} sm={4}>
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
      {users?.map((user) => (
        <User user={user} handleUserClick={handleUserClick} key={user.uid} />
      ))}
    </ChatsWrapper>
  );
};

export default UsersComponent;
