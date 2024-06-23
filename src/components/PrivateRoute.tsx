import { useCurrentUserContext } from "contexts/CurrentUserContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useCurrentUserContext();

  return currentUser ? <Outlet context="private-route" /> : <Navigate to={"/"} />;
}
