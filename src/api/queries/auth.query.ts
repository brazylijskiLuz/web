import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthApi } from "@/api/requests/auth.api";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthApi.login,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.login]);
    },
  });
};
