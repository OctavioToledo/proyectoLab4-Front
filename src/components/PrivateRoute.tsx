import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ReactNode;
  userRole: string | null;
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, userRole, allowedRoles }) => {
  if (!userRole) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return <>{element}</>;
};

export default PrivateRoute;
