import { AuthenticationStep, useAuthContext } from "contexts/AuthContext";
import SignInPage from "../components/auth/SignIn";
import SignOTPage from "../components/auth/SignOTP";

const AuthPage = () => {
  const { authenticationStep, signIn, signOTP, error } = useAuthContext();

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
