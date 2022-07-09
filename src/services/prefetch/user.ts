import { queryClient } from "@services/queryClient";

export function prefetchUser(id: string) {
  queryClient.prefetchQuery(["user", id], { staleTime: 1000 * 60 * 10 });
}
