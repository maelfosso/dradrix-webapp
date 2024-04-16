import { useCurrentUserContext } from "contexts/CurrentUserContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useCurrentUserContext();

  return currentUser ? <Outlet /> : <Navigate to={"/auth/sign-in"} />;
}
