import React, { FC } from "react";
import { useAuth } from "hooks";
import { Navigate } from "react-router-dom";
import routes from "routes";

const PrivateRoute: FC = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to={routes.login} />;
};

export default PrivateRoute;
