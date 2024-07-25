import { Data } from "models/monitoring";
import { UseQueryOptionsWithoutQueryFnKey } from "./type";
import { ACTIVITIES, ORGANIZATIONS } from "./activities";
import { fetchApiResponse } from "./axios";


export const DATA = "data";

interface GetAllDataFromActivityResponse {
  fields: Record<string, string>;
  data: Data[];
}
export const getAllDataFromActivity = (
  organizationId: string, activityId: string,
  options?: UseQueryOptionsWithoutQueryFnKey<GetAllDataFromActivityResponse>
) =>  ({
  queryKey: [ORGANIZATIONS, organizationId, ACTIVITIES, activityId, DATA],
  queryFn: async () => fetchApiResponse<GetAllDataFromActivityResponse>(
    `${ORGANIZATIONS}/${organizationId}/${ACTIVITIES}/${activityId}/data`, "GET"),
  ...options
});
