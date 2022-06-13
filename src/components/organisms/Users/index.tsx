import React, { FC } from "react";
import { ApiFirebase } from "api";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth } from "config/firebase";
import UsersComponent from "./Users.component";
import { DocumentData } from "firebase/firestore";
import { ShowUsers } from "pages/Home/types";
import { UserType } from "api/types";

interface UsersProps {
  selectUser: (user: DocumentData) => void;
  handleHamurgerClick: () => void;
  showUsers: ShowUsers;
}

const Users: FC<UsersProps> = ({
  selectUser,
  handleHamurgerClick,
  showUsers,
}) => {
  const uid = auth.currentUser?.uid;
  const usersQuery = uid ? ApiFirebase.availableUsersQuery(uid) : undefined;
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
