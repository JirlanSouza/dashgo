import { useQuery } from "react-query";

import { api } from "@services/api";
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

export function useUsers(page: number) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 1,
  });
}

async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get<{ users: User[] }>("/users", {
    params: { page },
  });

  const totalCount = Number(headers["x-total-count"]);
  const users = data.users.map((user) => ({
    ...user,
    createdAt: formatMediumDate(new Date(user.createdAt)),
  }));

  console.log(totalCount, users);

  return { totalCount, users };
}
