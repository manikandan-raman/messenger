import { useQuery } from "@tanstack/react-query";
import { httpCall } from "../utils/api-instance";

export const useGetUserById = (user_id) => {
  return useQuery({
    queryKey: ["userDetail", { user_id }],
    queryFn: async () => {
      return setTimeout(
        async () => (await httpCall.get(`user/${user_id}`)).data,
        500
      );
    },
    enabled: !!user_id,
    refetchOnWindowFocus: false,
  });
};
