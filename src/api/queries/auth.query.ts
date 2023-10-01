import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthApi } from "@/api/requests/auth.req";
import { queryKeys } from "@/api/queries/queryKeys";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthApi.login,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.login]);
    },
  });
};
