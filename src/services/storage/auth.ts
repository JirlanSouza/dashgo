import { setCookie, parseCookies, destroyCookie } from "nookies";

export type AuthTokens = {
  token: string;
  refreshToken: string;
};

abstract class Storage {
  private static tokenCookieName = "dashgo.token";
  private static refreshTokenCookieName = "dashgo.refreshToken";

  private cookies: { [key: string]: string };
  private maxAge: number = 60 * 24 * 30; // 30 days

  private updateCookies(ctx?) {
    this.cookies = parseCookies(ctx);
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

  getStoredToken(ctx) {
    this.updateCookies(ctx);

    return this.cookies[AuthStorage.tokenCookieName];
  }

  getStoredRefreshToken(ctx?) {
    this.updateCookies(ctx);

    return this.cookies[AuthStorage.refreshTokenCookieName];
  }

  removeTokens(ctx?) {
    destroyCookie(ctx, AuthStorage.tokenCookieName);
    destroyCookie(ctx, AuthStorage.refreshTokenCookieName);
  }
}

export class AuthStorage extends Storage {
  private static instance: AuthStorage;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!AuthStorage.instance) {
      AuthStorage.instance = new AuthStorage();
    }

    return AuthStorage.instance;
  }
}

export class ServerAuthStorage extends Storage {
  constructor() {
    super();
  }
}
