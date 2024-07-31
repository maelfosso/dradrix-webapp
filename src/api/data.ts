import { Data } from "models/monitoring";
import { UseQueryOptionsWithoutQueryFnKey } from "./type";
import { ACTIVITIES, ORGANIZATIONS } from "./activities";
import { fetchApiResponse } from "./axios";
import { UseMutationOptions } from "@tanstack/react-query";

export const DATA = "data";
export const UPLOAD = "upload"

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

interface CreateDataMutationResponse {
  data: Data,
}
interface CreateDataMutationRequest {
  values: Record<string, any>;
}
export const createDataMutation = (organizationId: string, activityId: string, options?: UseMutationOptions<CreateDataMutationResponse, Error, {}>) => ({
  mutationKey: [ORGANIZATIONS, organizationId, ACTIVITIES, activityId, DATA],
  mutationFn: (data: CreateDataMutationRequest) => fetchApiResponse<CreateDataMutationResponse, CreateDataMutationRequest>(
    `${ORGANIZATIONS}/${organizationId}/${ACTIVITIES}/${activityId}/${DATA}`,
    "POST",
    data,
  ),
  ...options
});

interface UploadFilesMutationResponse {}
interface UploadFilesMutationRequest {}
export const uploadFilesMutation =  (
  organizationId: string,
  activityId: string,
  progressCallback: (progressEvent: ProgressEvent) => void,
  options?: UseMutationOptions<UploadFilesMutationResponse, Error, {}>
) => ({
  mutationKey: [ORGANIZATIONS, organizationId, ACTIVITIES, activityId, DATA, UPLOAD],
  mutationFn: (data: FormData) => fetchApiResponse<UploadFilesMutationResponse, UploadFilesMutationRequest>(
    `${ORGANIZATIONS}/${organizationId}/${ACTIVITIES}/${activityId}/${DATA}/${UPLOAD}`,
    "POST",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent: ProgressEvent) => {
        progressCallback && progressCallback(progressEvent)
      }
    }
  ),
  ...options
});
