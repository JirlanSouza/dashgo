import { ApiClient } from "@services/api/apiClient";
import { BrowserAuthStorage } from "@services/storage/auth";

export const apiClient = new ApiClient(BrowserAuthStorage.getInstance());
