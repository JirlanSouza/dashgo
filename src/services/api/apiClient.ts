import axios, { AxiosDefaults, AxiosError, AxiosInstance } from "axios";

import { AuthStorage } from "@services/storage/auth";
import { navigateTo } from "../navigation";
import { AuthTokenError } from "@services/errors/AuthTokenError";
import { logger } from "@utils/logger/logger";

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
      logger.setContext("ApiClient").info("IS not authorized");
      return Promise.reject(error);
    }

    if (isNotTokenExpiredErrorCode) {
      logger.setContext("ApiClient").info("is not expired token");
      this.signOut();
      return Promise.reject(error);
    }

    if (ApiClient.isRefreshing) {
      logger.setContext("ApiClient").info("is refreshing");
      return this.handleIsRefreshingToken(error);
    }

    //logger.setContext("ApiClient").info("Is not refreshing");
    await this.handleIsNotRefreshingToken();
  }

  private handleIsRefreshingToken(error: AxiosError) {
    const apiClient = this;
    const config = error.config;

    return new Promise((resolve, reject) => {
      ApiClient.failedRequestsQueue.push({
        onSuccess(token) {
          logger.setContext("ApiClient").info(token);
          config.headers["Authorization"] = `Barear ${token}`;
          resolve(apiClient.request(config));
        },
        onFailed(err) {
          logger.setContext("ApiClient").warn(err.message);
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

      logger.setContext("ApiClient").info(newRefreshToken);

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
      logger.setContext("ApiClient").error(err);

      ApiClient.failedRequestsQueue.forEach((request) => request.onFailed(err));
      ApiClient.failedRequestsQueue = [];

      this.authStorage.removeTokens();
      if (!this.isBrowser()) {
        throw new AuthTokenError();
      }
    } finally {
      ApiClient.isRefreshing = false;
    }
  }

  updateAuthorization(token: string) {
    this.request.defaults.headers["Authorization"] = `Barear ${token}`;
  }

  private signOut() {
    this.authStorage.removeTokens();
    navigateTo("/");
  }

  private isBrowser() {
    return typeof window === "undefined" ? false : true;
  }
}
