import { Activity } from "models/monitoring";
import { fetchApiResponse } from "./axios";
import { UseQueryOptionsWithoutQueryFnKey } from "./type";
import { UseMutationOptions } from "@tanstack/react-query";

export const ORGANIZATIONS = "organizations";
export const ACTIVITIES = "activities";

interface GetActivityResponse {
  activity: Activity
}

export const getActivity = (
  organizationId: string,
  activityId: string,
  options?: UseQueryOptionsWithoutQueryFnKey<GetActivityResponse>
) =>  ({
  queryKey: [],
  queryFn: async () => fetchApiResponse<GetActivityResponse>(
    `${ORGANIZATIONS}/${organizationId}/${ACTIVITIES}/${activityId}`, "GET"),
  ...options
});

interface GetAllActivitiesResponse {
  activities: Activity[]
}
export const getAllActivities = (
  organizationId: string,
  options?: UseQueryOptionsWithoutQueryFnKey<GetAllActivitiesResponse>
) =>  ({
  queryKey: [ORGANIZATIONS, organizationId, ACTIVITIES],
  queryFn: async () => fetchApiResponse<GetAllActivitiesResponse>(
    `${ORGANIZATIONS}/${organizationId}/${ACTIVITIES}`, "GET"),
  ...options
});

interface CreateActivityMutationResponse {
  activity: Activity
}
interface CreateActivityMutationRequest {}
export const createActivityMutation = (companyId: string, options?: UseMutationOptions<CreateActivityMutationResponse, Error, {}>) => ({
  mutationKey: [ORGANIZATIONS, companyId, ACTIVITIES],
  mutationFn: () => fetchApiResponse<CreateActivityMutationResponse, CreateActivityMutationRequest>(
    `${ORGANIZATIONS}/${companyId}/${ACTIVITIES}`,
    "POST",
    {}
  ),
  ...options
});

interface UpdateActivityMutationResponse {
  activity: Activity
}
interface UpdateActivityMutationRequest {
  op: string
	field: string
	value: any;
	position?: number;
}
export const updateActivityMutation = (organizationId: string, activityId: string, options?: UseMutationOptions<UpdateActivityMutationResponse, Error, UpdateActivityMutationRequest>) => ({
  mutationKey: [ORGANIZATIONS, organizationId, ACTIVITIES, activityId],
  mutationFn: (data: UpdateActivityMutationRequest) => fetchApiResponse<UpdateActivityMutationResponse, UpdateActivityMutationRequest>(
    `${ORGANIZATIONS}/${organizationId}/${ACTIVITIES}/${activityId}`,
    "PATCH",
    data,
  ),
  ...options
});

