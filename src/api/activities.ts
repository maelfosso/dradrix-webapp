import { Activity } from "models/monitoring";
import { fetchApiResponse } from "./axios";
import { UseQueryOptionsWithoutQueryFnKey } from "./type";
import { UseMutationOptions } from "@tanstack/react-query";
import { useCallback } from "react";

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
export const getAllActivities = async (organizationId: string) => fetchApiResponse<GetAllActivitiesResponse>(`${ORGANIZATIONS}/${organizationId}/${ACTIVITIES}`, "GET");

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
	value?: any;
	position?: number;
}
export const updateActivityMutation = (organizationId: string, activityId: string, options?: UseMutationOptions<UpdateActivityMutationResponse, Error, UpdateActivityMutationRequest>) => ({
  mutationKey: [ORGANIZATIONS, organizationId, ACTIVITIES, activityId, 'update'],
  mutationFn: (data: UpdateActivityMutationRequest) => fetchApiResponse<UpdateActivityMutationResponse, UpdateActivityMutationRequest>(
    `${ORGANIZATIONS}/${organizationId}/${ACTIVITIES}/${activityId}`,
    "PATCH",
    data,
  ),
  ...options
});

interface DeleteActivityMutationRequest {}
interface DeleteActivityMutationResponse {
  deleted: boolean
}
export const deleteActivityMutation = (organizationId: string, activityId: string, options?: UseMutationOptions<DeleteActivityMutationResponse, Error, DeleteActivityMutationRequest>) => ({
  mutationKey: [ORGANIZATIONS, organizationId, ACTIVITIES, activityId, 'delete'],
  mutationFn: () => fetchApiResponse<DeleteActivityMutationResponse, DeleteActivityMutationRequest>(
    `${ORGANIZATIONS}/${organizationId}/${ACTIVITIES}/${activityId}`,
    "DELETE",
  ),
  ...options
})

export const deleteActivity = (organizationId: string, activityId: string) => fetchApiResponse<DeleteActivityMutationResponse, DeleteActivityMutationRequest>(
  `${ORGANIZATIONS}/${organizationId}/${ACTIVITIES}/${activityId}`,
  "DELETE",
);

