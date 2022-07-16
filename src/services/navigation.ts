import Router from "next/router";

export function navigateTo(path: string) {
  Router.push(path);
}
