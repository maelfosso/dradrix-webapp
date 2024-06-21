import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import SignInPage from "../components/auth/SignIn";
import SignOTPage from "../components/auth/SignOTP";
import useAuth, { AuthStep } from "hooks/useAuth";

const AuthPage = () => {
  // const { currentUser } = useCurrentUserContext();
  // const navigate = useNavigate();
  const { step, signIn, signOTP, error } = useAuth();

  // useEffect(() => {
  //   if (currentUser) {
  //     if (currentUser.preferences.onboardingStep != -1) {
  //       navigate("/onboarding");
  //     } else {
  //       // TODO change it to currentUser.company.id
  //       navigate(`/c/${currentUser.id}`)
  //     }
  //   }
  // }, [currentUser, navigate]);

  return (
    <div>
      { step === AuthStep.PHONE_NUMBER
        ? <SignInPage errorOnSignIn={error} onSignIn={signIn} />
        : <SignOTPage errorOnSignOTP={error} onSignOTP={signOTP} />
      }
    </div>
  )
}

export default AuthPage;
