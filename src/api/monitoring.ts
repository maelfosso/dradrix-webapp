import { MonitoredActivity } from "models/monitoring";
import { fetchApiResponse } from "./axios";
import { UseQueryOptionsWithoutQueryFnKey } from "./type";

export const MONITORING = "monitoring";

export const getMonitoredActivities = (
  options?: UseQueryOptionsWithoutQueryFnKey<MonitoredActivity[]>
) =>  ({
  queryKey: [],
  queryFn: async () => fetchApiResponse<MonitoredActivity[]>(MONITORING, "GET"),
  ...options
});
