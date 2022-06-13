import React, { FC } from "react";
import { ApiFirebase } from "api";
import { useCollectionData } from "react-firebase-hooks/firestore";
import UsersComponent from "./Users.component";
import { ShowUsers } from "pages/Home/types";
import { UserType } from "api/types";

interface UsersProps {
  selectUser: (user: UserType) => void;
  handleHamurgerClick: () => void;
  showUsers: ShowUsers;
  loggedUserId?: string;
}

const Users: FC<UsersProps> = ({
  selectUser,
  handleHamurgerClick,
  showUsers,
  loggedUserId,
}) => {
  const usersQuery = loggedUserId
    ? ApiFirebase.availableUsersQuery(loggedUserId)
    : undefined;
  const [users, loading, error] = useCollectionData<UserType>(usersQuery);

  return (
    <UsersComponent
      loading={loading}
      error={error}
      users={users}
      handleUserClick={selectUser}
      handleHamurgerClick={handleHamurgerClick}
      showUsers={showUsers}
    />
  );
};

export default Users;
