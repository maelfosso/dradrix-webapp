import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getAuthQuery, signInMutation, signOTPMutation } from "api/auth";
import Spinner from "components/common/Spinner";
import { SignInInputs, SignOTPInputs, UserType } from "models/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";


export enum AuthenticationStep {
  PHONE_NUMBER,
  OTP
}

interface AuthContextProps {
  authenticationStep: AuthenticationStep,
  authenticatedUser: UserType | null,
  setAuthenticatedUser: (user: UserType) => void,
  isAuthenticated: boolean,
  signIn: (signInInputs: SignInInputs) => void,
  signOTP: (signOTPInputs: SignOTPInputs) => void,
  signOut: () => void,
  error: string,
  setError: (error: string) => void,
}

export const AuthContext = createContext<AuthContextProps>({
  authenticationStep: AuthenticationStep.PHONE_NUMBER,
  authenticatedUser: null,
  setAuthenticatedUser: () => {},
  isAuthenticated: false,
  signIn: () => {},
  signOTP: () => {},
  signOut: () => {},
  error: '',
  setError: () => {}
});


interface AuthContextProviderProps {
  children: JSX.Element
}

const SS_AUTH_PN_KEY = 'auth/phone-number';
const SS_AUTH_STEP_KEY = 'auth/step';

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string>('');
  const [authenticationStep, setAuthenticationStep] = useState<AuthenticationStep>(
    localStorage.getItem(SS_AUTH_PN_KEY) ? AuthenticationStep.OTP : AuthenticationStep.PHONE_NUMBER
  );
  const [authenticatedUser, setAuthenticatedUser] = useState<UserType|null>(null);
  const navigate = useNavigate();

  const {isPending: isPendingAuth, data} =
    useQuery(getAuthQuery());

  useEffect(() => {
    if (data) {
      setAuthenticatedUser(data)
      setIsAuthenticated(!!data);
    }
  }, [data])

  useEffect(() => {
    if (!authenticatedUser) return;

    if (authenticatedUser.preferences.onboardingStep != -1) {
      navigate("/onboarding");
    } else {
      navigate(`/c/${authenticatedUser.preferences.organization.id}`);
    }
  }, [authenticatedUser])

  const { mutate: mutateSignIn } = useMutation(signInMutation({
    onSuccess: (phoneNumber: string) => {
      localStorage.setItem(SS_AUTH_PN_KEY, phoneNumber);
      setAuthenticationStep(AuthenticationStep.OTP);
    },
    onError: (error: Error) => {
      // setError(processError(error).error)
    }
  }));

  const { mutate: mutateSignOTP } = useMutation(signOTPMutation({
    onSuccess: (data: UserType) => {
      localStorage.removeItem(SS_AUTH_PN_KEY);
      localStorage.removeItem(SS_AUTH_STEP_KEY);

      setIsAuthenticated(true);
      setAuthenticatedUser(data);
    },
    onError: (error: Error) => {
      // setError(processError(error).error)
    }
  }));

  const signOTP = async (signOTPInputs: SignOTPInputs) => {
    mutateSignOTP({
      ...signOTPInputs,
      phoneNumber: localStorage.getItem(SS_AUTH_PN_KEY)!
    });
  }

  const signIn = async (signInInputs: SignInInputs) => {
    mutateSignIn(signInInputs);
  }

  const signOut = async () => {
    setAuthenticatedUser(null);
    setIsAuthenticated(false);

    navigate('/', { replace: true })
  }

  const value = useMemo(
    () => ({
      authenticationStep,
      authenticatedUser,
      setAuthenticatedUser,
      isAuthenticated,
      signIn,
      signOTP,
      signOut,
      error,
      setError
    }), [
      authenticationStep,
      authenticatedUser,
      setAuthenticatedUser,
      isAuthenticated,
      error
    ]
  );

  if (isPendingAuth) {
    return (
      <div className="grid h-screen place-items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
