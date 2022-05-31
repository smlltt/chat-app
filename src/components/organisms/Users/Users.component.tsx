import React, { FC } from "react";
import { Box, CircularProgress } from "@mui/material";
import { ErrorPlaceholder, User } from "components/molecules";
import {
  FirestoreError,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { ChatsWrapper } from "components/layouts";

interface UsersProps {
  loading: boolean;
  error: FirestoreError | undefined;
  users: QuerySnapshot<DocumentData> | undefined;
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
      {users?.docs.map((doc) => (
        <User user={doc.data()} handleUserClick={handleUserClick} />
      ))}
    </ChatsWrapper>
  );
};

export default UsersComponent;
