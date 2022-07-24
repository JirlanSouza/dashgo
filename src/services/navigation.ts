import Router from "next/router";

export function navigateTo(path: string) {
  if (typeof window === "undefined") {
    return;
  }

  Router.push(path);
}
