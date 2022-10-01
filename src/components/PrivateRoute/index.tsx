import React, { FC } from "react";
import { useAuth } from "hooks";
import { Navigate } from "react-router-dom";
import routes from "routes";
import { LoadingAndError } from "components/organisms";

const PrivateRoute: FC = ({ children }) => {
  const { user, loading } = useAuth();
  const loadingCompleteContent = user ? <>{children}</> : <Navigate to={routes.login} />;
  return loading ? <LoadingAndError loading /> : loadingCompleteContent;
};

export default PrivateRoute;
