import { AuthenticationStep, useAuthContext } from "contexts/AuthContext";
import SignInPage from "../components/auth/SignIn";
import SignOTPage from "../components/auth/SignOTP";
import { Navigate, useLocation } from "react-router-dom";

const AuthPage = () => {
  const { authenticationStep, handleSignIn, handleSignOTP, error, isAuthenticated, authenticatedUser } = useAuthContext();
  const { state } = useLocation();
  const redirectUrl = state?.redirectUrl;

  if (isAuthenticated && authenticatedUser) {
    if (authenticatedUser.preferences.onboardingStep != -1) {
      return (
        <Navigate
          to="/onboarding"
          replace
        />
      );
    } else {
      const nextUrl = `/org/${authenticatedUser.preferences.organization.id}`;

      return (
        <Navigate
          to={redirectUrl || nextUrl}
          replace
        />
      );
    }
  }

  return (
    <div>
      { authenticationStep === AuthenticationStep.PHONE_NUMBER
        ? <SignInPage errorOnSignIn={error} onSignIn={handleSignIn} />
        : <SignOTPage errorOnSignOTP={error} onSignOTP={handleSignOTP} />
      }
    </div>
  )
}

export default AuthPage;
