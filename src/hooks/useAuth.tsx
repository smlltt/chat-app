import { useContext, useEffect, useMemo } from "react";
import React, { FC, createContext, useState } from "react";
import { User } from "firebase/auth";
import { ApiFirebase } from "api";

export type AuthState = {
  user: null | User;
  loading: boolean;
};

const DEFAULT_STATE = {
  user: null,
  loading: true
};

const AuthContext = createContext<AuthState>(DEFAULT_STATE);

export const AuthProvider: FC = ({ children }) => {
  const [loading, setLoading]=useState(true);
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    ApiFirebase.detectLogin(setUser, setLoading);
  }, []);

  const authUser = useMemo(() => ({ user, loading }), [user, loading]);

  return (
    <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
  );
};

const useAuth = (): AuthState => useContext(AuthContext);

export default useAuth;
