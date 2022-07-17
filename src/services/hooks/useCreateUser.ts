import { apiClient } from "@services/api/setupApiClient";
import { queryClient } from "@services/queryClient";
import { useMutation } from "react-query";

type CreateUserData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export function useCreateUser() {
  return useMutation(
    "users",
    async (user: CreateUserData) => {
      const response = await apiClient.request.post("users", {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      if (response.status !== 201) {
        return new Error(response.statusText);
      }

      return response.data.users;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
      onError: () => {
        console.log("error");
      },
    }
  );
}
