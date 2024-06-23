import { useEffect, useMemo, useState } from "react";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import { SignInInputs, SignOTPInputs, UserType } from "models/auth";
import { useNavigate } from "react-router-dom";
import { processError } from "api/axios";
import { AUTH_OTP, getCurrentUserQuery, signInMutation, signOTPMutation } from "api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { randomId } from "lib/utils";

export enum AuthStep {
  PHONE_NUMBER,
  OTP
}

const SS_AUTH_PN_KEY = 'auth/phone-number';
const SS_AUTH_STEP_KEY = 'auth/step';

export default function useAuth() {
  const navigate = useNavigate();
  const { setCurrentUser } = useCurrentUserContext();
  const [error, setError] = useState<string>("");
  const [step, setStep] = useState<AuthStep>(
    sessionStorage.getItem(SS_AUTH_PN_KEY) ? AuthStep.OTP : AuthStep.PHONE_NUMBER
  );

  const {data: currentUser, error: errorOnCurrentUser, refetch: refetchCurrentUser, fetchStatus } =
    useQuery(getCurrentUserQuery(
      { enabled: false }
    ));
  
  useEffect(() => {
    console.log('[useAuth] currentUser ', currentUser);
    if (currentUser) {
      setCurrentUser(currentUser);

      if (currentUser.preferences.onboardingStep != -1) {
        navigate("/onboarding");
      } else {
        // TODO change it to currentUser.company.id
        navigate(`/c/${currentUser.preferences.organization.id}`)
      }
    }
  }, [currentUser, navigate, setCurrentUser]);

  useEffect(() => {
    if (fetchStatus === 'idle') return;

    switch (errorOnCurrentUser?.code) {
      case "ERR_NETWORK":
        setError('');
        break;
      default:
        setError(errorOnCurrentUser?.message || '');
    }
  }, [errorOnCurrentUser]);

  const { mutate: mutateSignIn } = useMutation(signInMutation({
    onSuccess: (phoneNumber: string) => {
      sessionStorage.setItem(SS_AUTH_PN_KEY, phoneNumber);
      setStep(AuthStep.OTP);
    },
    onError: (error: Error) => {
      setError(processError(error).error)
    }
  }));

  const { mutate: mutateSignOTP } = useMutation(signOTPMutation({
    onSuccess: (data: UserType) => {
      sessionStorage.removeItem(SS_AUTH_PN_KEY);
      sessionStorage.removeItem(SS_AUTH_STEP_KEY);
      setCurrentUserContext();
    },
    onError: (error: Error) => {
      setError(processError(error).error)
    }
  }));

  const setCurrentUserContext = async () => {
    console.log('[useAuth] setCurrentUserContext');
    refetchCurrentUser();
  }

  const signOTP = async (signOTPInputs: SignOTPInputs) => {
    console.log('[useAuth] signOTP', signOTPInputs);
    mutateSignOTP({
      ...signOTPInputs,
      phoneNumber: sessionStorage.getItem(SS_AUTH_PN_KEY)!
    });
  }

  const signIn = async (signInInputs: SignInInputs) => {
    mutateSignIn(signInInputs);
  }

  return {
    signOTP, 
    signIn,
    step,
    error
  }
}