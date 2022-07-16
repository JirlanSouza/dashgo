import { setCookie, parseCookies, destroyCookie } from "nookies";

export type AuthTokens = {
  token: string;
  refreshToken: string;
};

export class AuthStorage {
  private static instance: AuthStorage;
  private static tokenCookieName = "dashgo.token";
  private static refreshTokenCookieName = "dashgo.refreshToken";

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
    setCookie(undefined, AuthStorage.tokenCookieName, token, {
      maxAge: this.maxAge,
      path: "/",
    });

    setCookie(undefined, AuthStorage.refreshTokenCookieName, refreshToken, {
      maxAge: this.maxAge,
      path: "/",
    });
  }

  getStoredToken() {
    this.updateCookies();

    return this.cookies[AuthStorage.tokenCookieName];
  }

  getStoredRefreshToken() {
    this.updateCookies();

    return this.cookies[AuthStorage.refreshTokenCookieName];
  }

  removeTokens() {
    destroyCookie(undefined, AuthStorage.tokenCookieName);
    destroyCookie(undefined, AuthStorage.refreshTokenCookieName);
  }
}
