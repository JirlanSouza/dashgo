import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import { ServerAuthStorage } from "@services/storage/auth";
import { AuthTokenError } from "@services/errors/AuthTokenError";
import { logger } from "./logger/logger";

const homeRedirect = {
  redirect: {
    destination: "/",
    permanent: false,
  },
};

export function withSSRAuth<T>(fn: GetServerSideProps<T>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
    const authStorage = new ServerAuthStorage(ctx);
    const token = authStorage.getStoredToken();

    if (!token) {
      return homeRedirect;
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
