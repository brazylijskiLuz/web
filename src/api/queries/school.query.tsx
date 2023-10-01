import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { SchoolApi } from "../requests/school.req";
import { IGetSchoolsReq } from "@/models/school.model";

export const useGetSchoolInfo = (id: string) =>
  useQuery({
    queryFn: async () => await SchoolApi.getSchoolInfo(id),
    queryKey: [queryKeys.school, id],
  });

export const useGetSchools = (data: IGetSchoolsReq) =>
  useQuery({
    queryFn: async () => await SchoolApi.getSchools(data),
    queryKey: [queryKeys.school, JSON.stringify(data)],
  });
