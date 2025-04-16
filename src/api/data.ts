import { Data } from "@/models/monitoring";
import { UseQueryOptionsWithoutQueryFnKey } from "./type";
import { ACTIVITIES, ORGANIZATIONS } from "./activities";
import { fetchApiResponse } from "./axios";
import { UseMutationOptions } from "@tanstack/react-query";

export const DATA = "data";
export const UPLOAD = "upload"

export interface GetAllDataFromActivityResponse {
  fields: Record<string, {
    name: string;
    type: string;
  }>;
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

interface UpdateDataMutationResponse {
  data: Data,
}
interface UpdateDataMutationRequest {
  values: Record<string, any>;
}
export const updateDataMutation = (organizationId: string, activityId: string, options?: UseMutationOptions<UpdateDataMutationResponse, Error, {}>) => ({
  mutationKey: [ORGANIZATIONS, organizationId, ACTIVITIES, activityId, DATA, "update"],
  mutationFn: ({dataId, data}: {dataId: string; data: UpdateDataMutationRequest}) => fetchApiResponse<UpdateDataMutationResponse, UpdateDataMutationRequest>(
    `${ORGANIZATIONS}/${organizationId}/${ACTIVITIES}/${activityId}/${DATA}/${dataId}`,
    "PUT",
    data,
  ),
  ...options
});

interface DeleteDataMutationResponse {
  deleted: boolean
}
interface DeleteDataMutationRequest {}
export const deleteDataMutation = (organizationId: string, activityId: string, options?: UseMutationOptions<DeleteDataMutationResponse, Error, {}>) => ({
  mutationKey: [ORGANIZATIONS, organizationId, ACTIVITIES, activityId, DATA, "update"],
  mutationFn: (dataId: string) => fetchApiResponse<DeleteDataMutationResponse, DeleteDataMutationRequest>(
    `${ORGANIZATIONS}/${organizationId}/${ACTIVITIES}/${activityId}/${DATA}/${dataId}`,
    "DELETE",
  ),
  ...options
});

interface UploadFilesMutationResponse {
  fileKey: string
}
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


interface DeleteUploadedFileResponse {
  deleted: boolean;
}
interface DeleteUploadedFileRequest {
  fileKey: string
}
export const deleteUploadedFileMutation =  (
  organizationId: string,
  activityId: string,
  options?: UseMutationOptions<DeleteUploadedFileResponse, Error, {}>
) => ({
  mutationKey: [ORGANIZATIONS, organizationId, ACTIVITIES, activityId, DATA, UPLOAD],
  mutationFn: (data: DeleteUploadedFileRequest) => fetchApiResponse<DeleteUploadedFileResponse, DeleteUploadedFileRequest>(
    `${ORGANIZATIONS}/${organizationId}/${ACTIVITIES}/${activityId}/${DATA}/${UPLOAD}`,
    "DELETE",
    data,
  ),
  ...options
});
