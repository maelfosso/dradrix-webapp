import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios';
import { fromJson, toJson } from 'lib/json';

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

export class TError {
  error: string;

  constructor(message: string) {
    this.error = message;
  }
}

const api = axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:8080/",
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json",
  },
  withCredentials: true
});

const redirectToSignIn = () => {
  console.log('redirectToSignIn', window.location.pathname)
  if (window.location) {
    if (window.location.pathname.includes("/sign-in")) return;
    
    window.location.href = '/sign-in';
  }
};

// Request interceptor for adding the bearer token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     if (error?.response?.status === 401) {
//       redirectToSignIn();
//     }

//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      // We have a network error
      console.error('Network error:', error);
    }

    if (error?.response?.status === 401) {
      redirectToSignIn();
    }

    return Promise.reject(error);
  }
);

export const fetchApiResponse = async <T,S = Record<string, never>>(
  url: string,
  method: RequestMethod,
  payload?: S,
  params?: {
    headers?: AxiosRequestConfig['headers'],
    onUploadProgress?: (progressEvent: ProgressEvent) => void
  }
) => {
  const headers = params && params['headers'];
  const onUploadProgress = params && params['onUploadProgress']

  const { data } = await api<T>({
    method,
    url,
    data: (headers && headers['Content-Type'] === 'multipart/form-data') ? payload : toJson(payload),
    headers,
    onUploadProgress
  })

  return fromJson(data) as T;
}

export const processError = (error: Error) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      return new TError(error.response.data as string)
    } else if (error.request) {
      return new TError(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      return new TError(error.message)
    }
  } else {
    return new TError((error as Error).message)
  }
}

export default api;
