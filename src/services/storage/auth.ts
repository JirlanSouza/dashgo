import { setCookie, parseCookies } from "nookies";

export type AuthTokens = {
  token: string;
  refreshToken: string;
};

export class AuthStorage {
  private static instance: AuthStorage;
  private cookies: { [key: string]: string };
  private maxAge: number = 60 * 24 * 30; // 30 days

  private constructor() {}

  static getInstance() {
    if (!AuthStorage.instance) {
      AuthStorage.instance = new AuthStorage();
    }

    return AuthStorage.instance;
  }

  private updateCookies() {
    this.cookies = parseCookies();
  }

  storeAuthTokens({ token, refreshToken }: AuthTokens) {
    setCookie(undefined, "dashgo.token", token, {
      maxAge: this.maxAge,
      path: "/",
    });

    setCookie(undefined, "dashgo.refreshToken", refreshToken, {
      maxAge: this.maxAge,
      path: "/",
    });
  }

  getStoredToken() {
    this.updateCookies();

    return this.cookies["dashgo.token"];
  }

  getStoredRefreshToken() {
    this.updateCookies();

    return this.cookies["dashgo.refreshToken"];
  }
}
