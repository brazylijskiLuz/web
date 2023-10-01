import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { SchoolApi } from "../requests/school.req";

export const useGetSchoolInfo = (id: string) =>
  useQuery({
    queryFn: async () => await SchoolApi.getSchoolInfo(id),
    queryKey: [queryKeys.school, id],
  });
