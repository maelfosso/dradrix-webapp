import SignInPage from "../components/auth/SignIn";
import SignOTPage from "../components/auth/SignOTP";
import useAuth, { AuthStep } from "hooks/useAuth";

const AuthPage = () => {
  const { step, signIn, signOTP, error } = useAuth();

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
