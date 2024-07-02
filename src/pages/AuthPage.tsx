import { AuthenticationStep, useAuthContext } from "contexts/AuthContext";
import SignInPage from "../components/auth/SignIn";
import SignOTPage from "../components/auth/SignOTP";
import { Navigate, useLocation } from "react-router-dom";

const AuthPage = () => {
  const { authenticationStep, signIn, signOTP, error, isAuthenticated, authenticatedUser } = useAuthContext();
  const { state } = useLocation();
  const { redirectUrl } = state;

  if (isAuthenticated && authenticatedUser) {
    if (authenticatedUser.preferences.onboardingStep != -1) {
      return (
        <Navigate
          to="/onboarding"
          replace
        />
      );
    } else {
      const nextUrl = `/c/${authenticatedUser.preferences.organization.id}`;

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
        ? <SignInPage errorOnSignIn={error} onSignIn={signIn} />
        : <SignOTPage errorOnSignOTP={error} onSignOTP={signOTP} />
      }
    </div>
  )
}

export default AuthPage;
