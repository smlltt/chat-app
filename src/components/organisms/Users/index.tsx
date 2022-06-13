import React, { FC } from "react";
import { ApiFirebase } from "api";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth } from "config/firebase";
import UsersComponent from "./Users.component";
import { DocumentData } from "firebase/firestore";
import { UserType } from "api/types";

interface UsersProps {
  selectUser: (user: DocumentData) => void;
}

const Users: FC<UsersProps> = ({ selectUser }) => {
  const uid = auth.currentUser?.uid;
  const usersQuery = uid ? ApiFirebase.availableUsersQuery(uid) : undefined;

  const [users, loading, error] = useCollectionData<UserType>(usersQuery);
  console.log("users", users);
  return (
    <UsersComponent
      loading={loading}
      error={error}
      users={users}
      handleUserClick={selectUser}
    />
  );
};

export default Users;
