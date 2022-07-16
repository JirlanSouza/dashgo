import axios, { AxiosError } from "axios";

import { AuthStorage } from "@services/storage/auth";
import { navigateTo } from "./navigation";

type ResponseErrorData = {
  code?: string;
};

interface FailedRequest {
  onSuccess: (token: string) => void;
  onFailed: (err: AxiosError) => void;
}

const authStorage = AuthStorage.getInstance();
let isRefreshing = false;
let failedRequestsQueue: FailedRequest[] = [];

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

const authorizationApi = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Barear ${authStorage.getStoredToken()}`,
  },
});

authorizationApi.interceptors.response.use(
  (response) => response,
  responseInterceptor
);

async function responseInterceptor(error: AxiosError<ResponseErrorData>) {
  const isNotUnauthorizedStatus = error.response.status !== 401;
  const isNotTokenExpiredErrorCode =
    error.response?.data?.code !== "token.expired";

  if (isNotUnauthorizedStatus) {
    return Promise.reject(error);
  }

  if (isNotTokenExpiredErrorCode) {
    authStorage.removeTokens();
    navigateTo("/");
    return Promise.reject(error);
  }

  if (isRefreshing) {
    return handleIsRefreshingToken(error);
  }

  await handleIsNotRefreshingToken();
}

function handleIsRefreshingToken(error: AxiosError) {
  const config = error.config;

  return new Promise((resolve, reject) => {
    failedRequestsQueue.push({
      onSuccess(token) {
        config.headers["Authorization"] = `Barear ${token}`;
        resolve(authApi(config));
      },
      onFailed(err) {
        reject(err);
      },
    });
  });
}

async function handleIsNotRefreshingToken() {
  isRefreshing = true;
  const refreshToken = authStorage.getStoredRefreshToken();

  try {
    const response = await authorizationApi.post("/refresh", {
      refreshToken,
    });
    const { token, refreshToken: newRefreshToken } = response.data;

    authApi.updateAuthorization(token);
    authStorage.storeAuthTokens({
      token,
      refreshToken: newRefreshToken,
    });

    failedRequestsQueue.forEach((request) => request.onSuccess(token));
    failedRequestsQueue = [];
  } catch (err) {
    failedRequestsQueue.forEach((request) => request.onFailed(err));
    failedRequestsQueue = [];
  } finally {
    isRefreshing = false;
  }
}

function updateAuthorization(token: string) {
  authorizationApi.defaults.headers["Authorization"] = `Barear ${token}`;
}

export const authApi = Object.assign(authorizationApi, { updateAuthorization });
