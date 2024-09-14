import { User } from "models/auth";
import { fetchApiResponse } from "./axios";
import { UseQueryOptionsWithoutQueryFnKey } from "./type";

export const AUTH_USER = "user";
export const AUTH_OTP = "auth/otp";
export const AUTH_OTP_CHECK = "auth/otp-check";

export type SignInRequest = {
  phoneNumber: string
  organizationId?: string
}

export type SignInResponse = {
  phoneNumber: string
  redirectToUrl: string
}
export const signIn = (inputs: SignInRequest) => fetchApiResponse<SignInResponse, SignInRequest>(AUTH_OTP, "POST", inputs);

export type SignOTPResponse = {
  user: User
  redirectToUrl: string
}

export type SignOTPRequest = {
  phoneNumber: string
  pinCode: string
}

export const signOTP = (inputs: SignOTPRequest) => fetchApiResponse<SignOTPResponse, SignOTPRequest>(AUTH_OTP_CHECK, "POST", inputs);

export const getCurrentUser = () => fetchApiResponse<User>(AUTH_USER, "GET");

export const getAuthQuery = (options?: UseQueryOptionsWithoutQueryFnKey<User>) => ({
  queryKey: [AUTH_USER],
  queryFn: async () => fetchApiResponse<User>(AUTH_USER, "GET"),
  ...options
});
