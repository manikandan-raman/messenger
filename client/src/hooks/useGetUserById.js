import { useQuery } from "@tanstack/react-query";
import { httpCall } from "../utils/api-instance";

export const useGetUserById = (user_id) => {
  return useQuery({
    queryKey: ["userDetail", { user_id }],
    queryFn: async () => {
      return (await httpCall.get(`user/${user_id}`)).data;
    },
    enabled: !!user_id,
  });
};
