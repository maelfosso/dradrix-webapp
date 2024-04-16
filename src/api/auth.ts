import { SignInInputs, SignUpInputs, UserType } from "models/auth";
import { fetchApiResponse } from "./axios";
import { QueryObserverOptions, UseMutationOptions } from "@tanstack/react-query";

export const AUTH_USER = "user";
export const AUTH_SIGN_IN = "auth/sign-in";
export const AUTH_SIGN_UP = "auth/sign-up";

export const signInMutation = (options: UseMutationOptions<UserType, Error, SignInInputs>) => ({
  mutationKey: [AUTH_SIGN_IN],
  mutationFn:  (inputs: SignInInputs) => fetchApiResponse<UserType, SignInInputs>(AUTH_SIGN_IN, "POST", inputs),
  ...options
});

export const signUpMutation = (options: UseMutationOptions<UserType, Error, SignUpInputs>) => ({
  mutationKey: [AUTH_SIGN_UP],
  mutationFn:  (inputs: SignUpInputs) => fetchApiResponse<UserType, SignUpInputs>(AUTH_SIGN_UP, "POST", inputs),
  ...options
});

export const getCurrentUserQuery = (options?: QueryObserverOptions<UserType, Error, void>) => ({
  queryKey: [AUTH_USER],
  queryFn: async () => fetchApiResponse<UserType>(AUTH_USER, "GET"),
  ...options
});
