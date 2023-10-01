import { useQuery } from "@tanstack/react-query";
import { MapApi } from "../requests/map.req";
import { queryKeys } from "./queryKeys";

export const useGetLocations = () =>
  useQuery({
    queryFn: async () => await MapApi.getLocations(),
    queryKey: [queryKeys.locations],
  });
