import { SignInInputs, SignOTPInputs, User } from "models/auth";
import { fetchApiResponse } from "./axios";
import { UseMutationOptions } from "@tanstack/react-query";
import { UseQueryOptionsWithoutQueryFnKey } from "./type";

export const AUTH_USER = "user";
export const AUTH_OTP = "auth/otp";
export const AUTH_OTP_CHECK = "auth/otp/check";

export type SignInMutationResponse = {
  phoneNumber: string
}
export const signInMutation = (options: UseMutationOptions<SignInMutationResponse, Error, SignInInputs>) => ({
  mutationKey: [AUTH_OTP],
  mutationFn:  (inputs: SignInInputs) => fetchApiResponse<SignInMutationResponse, SignInInputs>(AUTH_OTP, "POST", inputs),
  ...options
});

export type SignOTPMutationResponse = {
  user: User
}
export const signOTPMutation = (options: UseMutationOptions<SignOTPMutationResponse, Error, SignOTPInputs>) => ({
  mutationKey: [AUTH_OTP_CHECK],
  mutationFn:  (inputs: SignOTPInputs) => fetchApiResponse<SignOTPMutationResponse, SignOTPInputs>(AUTH_OTP_CHECK, "POST", inputs),
  ...options
});

export const getAuthQuery = (options?: UseQueryOptionsWithoutQueryFnKey<User>) => ({
  queryKey: [AUTH_USER],
  queryFn: async () => fetchApiResponse<User>(AUTH_USER, "GET"),
  ...options
});
