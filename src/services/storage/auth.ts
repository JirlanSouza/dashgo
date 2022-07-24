import { logger } from "@utils/logger/logger";
import { setCookie, parseCookies, destroyCookie } from "nookies";

export interface AuthStorage {
  storeAuthTokens(tokens: AuthTokens): void;
  getStoredToken(): string;
  getStoredRefreshToken(): string;
  removeTokens(): void;
}

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

  protected storeAuthTokens({ token, refreshToken }: AuthTokens, ctx?) {
    setCookie(ctx, Storage.tokenCookieName, token, {
      maxAge: this.maxAge,
      path: "/",
    });

    setCookie(ctx, Storage.refreshTokenCookieName, refreshToken, {
      maxAge: this.maxAge,
      path: "/",
    });
  }

  protected getStoredToken(ctx?) {
    this.updateCookies(ctx);

    return this.cookies[Storage.tokenCookieName];
  }

  protected getStoredRefreshToken(ctx?) {
    this.updateCookies(ctx);

    return this.cookies[Storage.refreshTokenCookieName];
  }

  protected removeTokens(ctx?) {
    destroyCookie(ctx, Storage.tokenCookieName);
    destroyCookie(ctx, Storage.refreshTokenCookieName);
  }
}

export class BrowserAuthStorage extends Storage {
  private static instance: AuthStorage;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!BrowserAuthStorage.instance) {
      BrowserAuthStorage.instance = new BrowserAuthStorage();
    }

    return BrowserAuthStorage.instance;
  }

  storeAuthTokens(tokens: AuthTokens) {
    super.storeAuthTokens(tokens);
  }

  getStoredToken() {
    return super.getStoredToken();
  }

  getStoredRefreshToken() {
    return super.getStoredRefreshToken();
  }

  removeTokens() {
    super.removeTokens();
  }
}

export class ServerAuthStorage extends Storage {
  constructor(private ctx?) {
    super();
  }

  storeAuthTokens(tokens: AuthTokens) {
    super.storeAuthTokens(tokens, this.ctx);
  }

  getStoredToken() {
    return super.getStoredToken(this.ctx);
  }

  getStoredRefreshToken() {
    return super.getStoredRefreshToken(this.ctx);
  }

  removeTokens() {
    super.removeTokens(this.ctx);
  }
}
