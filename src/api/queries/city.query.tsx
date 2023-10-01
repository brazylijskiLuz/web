import { CityApi } from "@/api/requests/city.req";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/queries/queryKeys";

export const useGetCities = (data: CityApi.IGetCityReq) =>
  useQuery({
    queryFn: async () => await CityApi.getCity(data),
    queryKey: [queryKeys.cities, data.query],
  });
