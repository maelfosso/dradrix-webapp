import { useAuthContext } from "contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute() {
  const { isAuthenticated } = useAuthContext();
  const { pathname } = useLocation();

  return isAuthenticated ? <Outlet /> : <Navigate to={"/sign-in"} replace state={{ 'redirectUrl': pathname }}/>;
}
