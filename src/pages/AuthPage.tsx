import { AuthenticationStep, useAuthContext } from "contexts/AuthContext";
import SignInPage from "../components/auth/SignIn";
import SignOTPage from "../components/auth/SignOTP";
import { Navigate } from "react-router-dom";

const AuthPage = () => {
  const { authenticationStep, signIn, signOTP, error, isAuthenticated, authenticatedUser } = useAuthContext();

  if (isAuthenticated && authenticatedUser) {
    if (authenticatedUser.preferences.onboardingStep != -1) {
      return (
        <Navigate
          to="/onboarding"
          replace
        />
      );
    } else {
      return (
        <Navigate
          to={`/c/${authenticatedUser.preferences.organization.id}`}
          replace
        />
      );
    }
  }

  return (
    <div>
      { authenticationStep === AuthenticationStep.PHONE_NUMBER
        ? <SignInPage errorOnSignIn={error} onSignIn={signIn} />
        : <SignOTPage errorOnSignOTP={error} onSignOTP={signOTP} />
      }
    </div>
  )
}

export default AuthPage;
