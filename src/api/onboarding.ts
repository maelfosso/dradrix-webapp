import { fetchApiResponse } from "./axios";

export const AUTH_PROFILE = "/auth/profile";
export const AUTH_ORGANIZATION = "/auth/organization";
export const ONBOARDING_END = "/user/onboarding/end";

export interface UpdateProfileRequest {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

export interface UpdateProfileResponse {
  redirectToUrl: string
}

export const updateProfile = (inputs: UpdateProfileRequest) => fetchApiResponse<UpdateProfileResponse, UpdateProfileRequest>(AUTH_PROFILE, "POST", inputs);

export type OrganizationMutationResponse = {
  id: string;
}


export interface SetUpOrganizationRequest {
  name: string
  bio: string
  email: string
  phoneNumber: string
}

export interface SetUpOrganizationResponse {
  Id: string
  redirectToUrl: string
}

export const setUpOrganization = (inputs: SetUpOrganizationRequest) => fetchApiResponse<SetUpOrganizationResponse, SetUpOrganizationRequest>(AUTH_ORGANIZATION, "POST", inputs)

