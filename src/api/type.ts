import { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type UseQueryOptionsWithoutQueryFnKey<TQueryFnData, TError = AxiosError, TData = TQueryFnData> = Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    'queryKey' | 'queryFn' | 'initialData'
>
