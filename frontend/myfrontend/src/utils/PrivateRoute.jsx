import React from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { authTokens } = React.useContext(AuthContext);

  if (!authTokens) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
