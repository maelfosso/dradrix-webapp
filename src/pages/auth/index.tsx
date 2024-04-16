import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "contexts/CurrentUserContext";

const AuthPage = () => {
  const { currentUser } = useCurrentUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/orgs");
    }
  }, [currentUser, navigate]);

  return (
    <Outlet />
  )
}

export default AuthPage;
