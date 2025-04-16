import { User } from "models/auth";
import { fetchApiResponse } from "./axios";
import { UseQueryOptionsWithoutQueryFnKey } from "./type";

export const AUTH_USER = "user";
export const AUTH_OTP = "auth/otp";
export const AUTH_OTP_CHECK = "auth/otp-check";

export type SignInRequest = {
  phoneNumber: string
  invitationToken?: string
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

interface SignOTPRequestOptions {
  from?: string
}
export const signOTP = (inputs: SignOTPRequest, options: SignOTPRequestOptions = {}) =>
  fetchApiResponse<SignOTPResponse, SignOTPRequest>(
    `${AUTH_OTP_CHECK}?from=${options['from'] ?? ''}`,
    "POST",
    inputs
  );

export const getCurrentUser = () => fetchApiResponse<User>(AUTH_USER, "GET");
