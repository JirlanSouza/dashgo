import Router from "next/router";

export function navigateTo(path: string) {
  if (!window) {
    return;
  }

  Router.push(path);
}
