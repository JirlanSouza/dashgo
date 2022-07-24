import { ApiClient } from "@services/api/apiClient";
import { BrowserAuthStorage, ServerAuthStorage } from "@services/storage/auth";

export const apiClient = new ApiClient(BrowserAuthStorage.getInstance());
export const getServerApiClient = (ctx) =>
  new ApiClient(new ServerAuthStorage(ctx));
