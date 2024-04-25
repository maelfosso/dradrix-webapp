import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import SignInPage from "../components/auth/SignIn";
import SignOTPage from "../components/auth/SignOTP";
import useAuth, { AuthStep } from "hooks/useAuth";

const AuthPage = () => {
  const { currentUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const { step, id, signIn, error } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/orgs");
    }
  }, [currentUser, navigate]);

  return (
    <div>
      { step === AuthStep.PHONE_NUMBER
        ? <SignInPage errorOnSignIn={error} onSignIn={signIn} />
        : <SignOTPage />
      }
    </div>
  )
}

export default AuthPage;
