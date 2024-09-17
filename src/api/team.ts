import { Member } from "models/onboarding";
import { fetchApiResponse } from "./axios";
import { ORGANIZATIONS } from "./activities";
import { SignInRequest, SignInResponse } from "./auth";

interface GetTeamResponse {
  members: Member[]
}

export const getTeam = async (organizationId: string) => {
  return await fetchApiResponse<GetTeamResponse>(`${ORGANIZATIONS}/${organizationId}/team`, "GET")
}

export const addMemberIntoTeam = async (params: SignInRequest) =>
  fetchApiResponse<SignInResponse, SignInRequest>(`join/${params.invitationToken}`, "POST", { ...params, invitationToken: undefined })