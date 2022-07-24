import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import decode from "jwt-decode";

import { ServerAuthStorage } from "@services/storage/auth";
import { AuthTokenError } from "@services/errors/AuthTokenError";
import { logger } from "./logger/logger";
import { User, validateUserPermissions } from "./validateUserPermissions";

const homeRedirect = {
  redirect: {
    destination: "/",
    permanent: false,
  },
};

type withSSRAuthOptions = {
  permissions?: string[];
  roles?: string[];
};

export function withSSRAuth<T>(
  fn: GetServerSideProps<T>,
  options: withSSRAuthOptions
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
    const authStorage = new ServerAuthStorage(ctx);
    const token = authStorage.getStoredToken();

    if (!token) {
      return homeRedirect;
    }

    const user = decode<User>(token);

    logger.info(user);

    if (options) {
      if (!validateUserPermissions({ user, ...options })) {
        return {
          redirect: {
            destination: "/dashboard",
            permanent: false,
          },
        };
      }
    }

    try {
      const fnReturn = await fn(ctx);
      logger.info(fnReturn);
      return fnReturn;
    } catch (err) {
      logger.info(err.message);
      if (err instanceof AuthTokenError) {
        return homeRedirect;
      }
    }
  };
}
