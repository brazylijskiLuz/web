import { api } from "@/api/api.config";
import { Api } from "@/models/api.model";

export namespace CityApi {
  export interface IGetCityReq {
    query?: string;
    page?: string;
  }

  export interface IGetCityRes {
    id: string;
    name: string;
    voivodeship: string;
    x: string;
    y: string;
  }

  export const getCity = async (data: IGetCityReq) => {
    const res = await api.get<Api<IGetCityRes[]>>("City", { params: data });

    return res.data;
  };
}
