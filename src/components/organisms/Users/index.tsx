import React, { FC } from "react";
import { ApiFirebase } from "api";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth } from "config/firebase";
import UsersComponent from "./Users.component";
import { DocumentData } from "firebase/firestore";

interface UsersProps {
  selectUser: (user: DocumentData) => void;
}

const Users: FC<UsersProps> = ({ selectUser }) => {
  const uid = auth.currentUser?.uid;
  const usersQuery = uid
    ? ApiFirebase.createQuery("users", "uid", "!=", uid)
    : undefined;

  const [users, loading, error] = useCollection(usersQuery);

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
