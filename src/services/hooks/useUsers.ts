import { useQuery } from "react-query";

import { apiClient } from "@services/api/setupApiClient";
import { formatMediumDate } from "@utils/date/formatter";
import { type } from "os";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersResponse = {
  totalCount: number;
  users: User[];
};

type UseUsersOptions = {
  initialData: GetUsersResponse;
};

export function useUsers(page: number, options?: UseUsersOptions) {
  return useQuery(["users", page], () => getUsers(page), {
    ...options,
    staleTime: 1000 * 60 * 1,
  });
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await apiClient.request.get<{ users: User[] }>(
    "/users",
    {
      params: { page },
    }
  );

  const totalCount = Number(headers["x-total-count"]);
  const users = data.users.map((user) => ({
    ...user,
    createdAt: formatMediumDate(new Date(user.createdAt)),
  }));

  console.log(totalCount, users);

  return { totalCount, users };
}
