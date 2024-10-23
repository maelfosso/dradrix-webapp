import * as React from 'react';
import { useAuthContext } from "@/contexts/auth.context";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute() {
  const { isAuthenticated } = useAuthContext();
  const { pathname } = useLocation();

  return isAuthenticated ? <Outlet /> : <Navigate to={"/auth/sign-in"} replace state={{ 'redirectUrl': pathname }}/>;
}
