import { useEffect, useState } from "react";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import { SignInInputs, SignUpInputs, UserType } from "models/auth";
import { useNavigate } from "react-router-dom";
import { processError } from "api/axios";
import { getCurrentUserQuery, signInMutation, signUpMutation } from "api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useAuth() {
  const navigate = useNavigate();
  const { setCurrentUser } = useCurrentUserContext();
  const [error, setError] = useState<string>("");

  const {data: currentUser, error: errorOnCurrentUser, refetch: refetchCurrentUser } =
    useQuery(getCurrentUserQuery(
      // {
      //   enabled: false
      // }
    ));

  useEffect(() => {
    if (currentUser) {
      setCurrentUser(currentUser);
      navigate("/orgs");
    }
  }, [currentUser, navigate, setCurrentUser]);

  useEffect(() => {
    if (errorOnCurrentUser) {
      setError(errorOnCurrentUser.message)
    }
  }, [errorOnCurrentUser])

  const { mutate: mutateSignIn } = useMutation(signInMutation({
    onSuccess: (data: UserType) => {
      setCurrentUserContext();
    },
    onError: (error: Error) => {
      setError(processError(error).error)
    }
  }));

  const { mutate: mutateSignUp } = useMutation(signUpMutation({
    onSuccess: (data: UserType) => {
      setCurrentUserContext();
    },
    onError: (error: Error) => {
      setError(processError(error).error)
    }
  }));

  const setCurrentUserContext = async () => {
    refetchCurrentUser();
  }

  const signUp = async (signUpInputs: SignUpInputs) => {
    mutateSignUp(signUpInputs);
  }

  const signIn = async (signInInputs: SignInInputs) => {
    mutateSignIn(signInInputs);
  }

  return {
    signUp, 
    signIn,
    error
  }
}