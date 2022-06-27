import React, { FC } from "react";
import { User } from "components/molecules";
import { FirestoreError } from "firebase/firestore";
import { ChatsWrapper } from "components/layouts";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ShowUsers } from "pages/Home/types";
import { UserType } from "api/types";
import { LoadingAndError } from "components/organisms";

interface UsersProps {
  loading: boolean;
  error: FirestoreError | undefined;
  users: UserType[] | undefined;
  handleUserClick: (user: UserType) => void;
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
        <LoadingAndError loading={loading} error={error} />
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
