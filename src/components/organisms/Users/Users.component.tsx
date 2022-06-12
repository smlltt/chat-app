import React, { FC } from "react";
import { Box, CircularProgress } from "@mui/material";
import { ErrorPlaceholder, User } from "components/molecules";
import { FirestoreError, DocumentData } from "firebase/firestore";
import { ChatsWrapper } from "components/layouts";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ShowUsers } from "pages/Home/types";

interface UsersProps {
  loading: boolean;
  error: FirestoreError | undefined;
  users: DocumentData[] | undefined;
  handleUserClick: (user: DocumentData) => void;
  handleHamurgerClick: () => void;
  showUsers: ShowUsers;
}

const UsersComponent: FC<UsersProps> = ({
  loading,
  error,
  users,
  handleUserClick,
  handleHamurgerClick,
  showUsers,
}) => {
  return (
    <ChatsWrapper xs={showUsers.usersWrapperSpace} sm={4}>
      <IconButton
        sx={{ display: { xs: "block", sm: "none" } }}
        component="span"
        onClick={handleHamurgerClick}
      >
        <MenuIcon />
      </IconButton>
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
        <User
          user={user}
          handleUserClick={handleUserClick}
          key={user.uid}
          display={showUsers.usersDisplay}
        />
      ))}
    </ChatsWrapper>
  );
};

export default UsersComponent;
