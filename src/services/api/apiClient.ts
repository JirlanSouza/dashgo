import axios, { AxiosDefaults, AxiosError, AxiosInstance } from "axios";

import { AuthStorage } from "@services/storage/auth";
import { navigateTo } from "../navigation";
import { apiClient } from "./setupApiClient";

type ResponseErrorData = {
  code?: string;
};

interface FailedRequest {
  onSuccess: (token: string) => void;
  onFailed: (err: AxiosError) => void;
}

export class ApiClient {
  private static isRefreshing = false;
  private static failedRequestsQueue: FailedRequest[] = [];

  private authStorage: AuthStorage;
  private defaults: AxiosDefaults;
  request: AxiosInstance;

  constructor(authStorage: AuthStorage) {
    this.authStorage = authStorage;
    this.setUpHttpClient();
    this.setUpInterceptors();
  }

  private setUpHttpClient() {
    this.request = axios.create({
      baseURL: "http://localhost:3333",
      headers: {
        Authorization: `Barear ${this.authStorage.getStoredToken()}`,
      },
    });

    this.defaults = this.request.defaults;
  }

  private setUpInterceptors() {
    this.request.interceptors.response.use(
      (response) => response,
      this.responseInterceptor.bind(this)
    );
  }

  private async responseInterceptor(error: AxiosError<ResponseErrorData>) {
    const isNotUnauthorizedStatus = error.response.status !== 401;
    const isNotTokenExpiredErrorCode =
      error.response?.data?.code !== "token.expired";

    if (isNotUnauthorizedStatus) {
      console.log("IS not authorized");
      return Promise.reject(error);
    }

    if (isNotTokenExpiredErrorCode) {
      console.log("is not expired token");
      this.authStorage.removeTokens();
      navigateTo("/");
      return Promise.reject(error);
    }

    if (ApiClient.isRefreshing) {
      console.log("is refreshing");
      return this.handleIsRefreshingToken(error);
    }

    this.handleIsNotRefreshingToken();
  }

  private handleIsRefreshingToken(error: AxiosError) {
    const apiClient = this;
    const config = error.config;

    return new Promise((resolve, reject) => {
      ApiClient.failedRequestsQueue.push({
        onSuccess(token) {
          config.headers["Authorization"] = `Barear ${token}`;
          resolve(apiClient.request(config));
        },
        onFailed(err) {
          reject(err);
        },
      });
    });
  }

  private async handleIsNotRefreshingToken() {
    ApiClient.isRefreshing = true;
    const refreshToken = this.authStorage.getStoredRefreshToken();

    try {
      const response = await this.request.post("/refresh", {
        refreshToken,
      });

      const { token, refreshToken: newRefreshToken } = response.data;

      this.updateAuthorization(token);
      this.authStorage.storeAuthTokens({
        token,
        refreshToken: newRefreshToken,
      });

      ApiClient.failedRequestsQueue.forEach((request) =>
        request.onSuccess(token)
      );
      ApiClient.failedRequestsQueue = [];
    } catch (err) {
      ApiClient.failedRequestsQueue.forEach((request) => request.onFailed(err));
      ApiClient.failedRequestsQueue = [];
    } finally {
      ApiClient.isRefreshing = false;
    }
  }

  updateAuthorization(token: string) {
    this.request.defaults.headers["Authorization"] = `Barear ${token}`;
  }
}
