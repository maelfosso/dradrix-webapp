import { Member } from "models/onboarding";
import { fetchApiResponse } from "./axios";
import { ORGANIZATIONS } from "./activities";

interface GetTeamResponse {
  members: Member[]
}

export const getTeam = async (organizationId: string) => {
  return await fetchApiResponse<GetTeamResponse>(`${ORGANIZATIONS}/${organizationId}/team`, "GET")
}
