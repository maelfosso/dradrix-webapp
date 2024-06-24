import { UseMutationOptions } from "@tanstack/react-query";
import { fetchApiResponse } from "./axios";
import { Profile, Organization } from "models/onboarding";

export const ONBOARDING_PROFILE = "/user/onboarding/profile";
export const ONBOARDING_ORGANIZATION = "/user/onboarding/organization";
export const ONBOARDING_END = "/user/onboarding/end";

export const setProfileMutation = (options: UseMutationOptions<boolean, Error, Profile>) => ({
  mutationKey: [ONBOARDING_PROFILE],
  mutationFn:  (inputs: Profile) => fetchApiResponse<boolean, Profile>(ONBOARDING_PROFILE, "POST", inputs),
  ...options
});

export type OrganizationMutationResponse = {
  id: string;
}

export const setOrganizationMutation = (options: UseMutationOptions<OrganizationMutationResponse, Error, Organization>) => ({
  mutationKey: [ONBOARDING_ORGANIZATION],
  mutationFn:  (inputs: Organization) => fetchApiResponse<OrganizationMutationResponse, Organization>(ONBOARDING_ORGANIZATION, "POST", inputs),
  ...options
});

export const endOfOnboardingMutation = (options: UseMutationOptions<string, Error, {}>) => ({
  mutationKey: [ONBOARDING_ORGANIZATION],
  mutationFn:  () => fetchApiResponse<string, void>(ONBOARDING_END, "POST"),
  ...options
});
