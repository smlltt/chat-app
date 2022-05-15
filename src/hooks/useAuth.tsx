import { useContext, useEffect, useMemo } from "react";
import React, { FC, createContext, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

import { auth } from "config/firebase";

export type AuthState = {
  user: null | User;
};

const DEFAULT_STATE = {
  user: null,
};

const AuthContext = createContext<AuthState>(DEFAULT_STATE);

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<null | User>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const authUser = useMemo(() => ({ user }), [user]);

  return (
    <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
  );
};

const useAuth = (): AuthState => useContext(AuthContext);

export default useAuth;
