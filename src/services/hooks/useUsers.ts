import { useQuery } from "react-query";

import { api } from "@services/api";
import { formatMediumDate } from "@utils/date/formatter";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export function useUsers() {
  return useQuery("users", getUsers, {
    staleTime: 1000 * 60 * 1,
  });
}

async function getUsers(): Promise<User[]> {
  const { data } = await api.get<{ users: User[] }>("/users");

  const users = data.users.map((user) => ({
    ...user,
    createdAt: formatMediumDate(new Date(user.createdAt)),
  }));

  return users;
}
