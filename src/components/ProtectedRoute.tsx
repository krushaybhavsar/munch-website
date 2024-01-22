import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "../screens/LoadingScreen/LoadingScreen";

type ProtectedRouteProps = {
  isAllowed: boolean;
  redirectPath?: string;
  children: any;
  loading?: boolean;
};

const ProtectedRoute = (props: ProtectedRouteProps) => {
  if (!props.isAllowed && !props.loading) {
    return (
      <Navigate to={props.redirectPath ? props.redirectPath : "/"} replace />
    );
  }

  if (props.loading) {
    return <LoadingScreen />;
  }

  return props.children ? props.children : <Outlet />;
};

export default ProtectedRoute;
