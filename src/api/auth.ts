import { SignInInputs, SignOTPInputs, UserType } from "models/auth";
import { fetchApiResponse } from "./axios";
import { UseMutationOptions } from "@tanstack/react-query";
import { UseQueryOptionsWithoutQueryFnKey } from "./type";

export const AUTH_USER = "user";
export const AUTH_OTP = "auth/otp";
export const AUTH_OTP_CHECK = "auth/otp/check";

export const signInMutation = (options: UseMutationOptions<string, Error, SignInInputs>) => ({
  mutationKey: [AUTH_OTP],
  mutationFn:  (inputs: SignInInputs) => fetchApiResponse<string, SignInInputs>(AUTH_OTP, "POST", inputs),
  ...options
});

export const signOTPMutation = (options: UseMutationOptions<UserType, Error, SignOTPInputs>) => ({
  mutationKey: [AUTH_OTP_CHECK],
  mutationFn:  (inputs: SignOTPInputs) => fetchApiResponse<UserType, SignOTPInputs>(AUTH_OTP_CHECK, "POST", inputs),
  ...options
});

export const getCurrentUserQuery = (options?: UseQueryOptionsWithoutQueryFnKey<UserType>) => ({
  queryKey: [AUTH_USER],
  queryFn: async () => fetchApiResponse<UserType>(AUTH_USER, "GET"),
  ...options
});
