import { Organization } from "models/onboarding"
import { ORGANIZATIONS } from "./activities"
import { fetchApiResponse } from "./axios"

interface GetOrganizationResponse {
  organization: Organization
}

export const getOrganization = async (organizationId: string) => {
  return await fetchApiResponse<GetOrganizationResponse>(`${ORGANIZATIONS}/${organizationId}`, "GET")
}
