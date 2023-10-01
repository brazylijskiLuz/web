import { api } from "@/api/api.config";
import { Api } from "@/models/api.model";

export interface ILocation {
  universityId: string;
  x: string;
  y: string;
}

export namespace MapApi {
  export const getLocations = async () => {
    const res = await api.get<Api<ILocation[]>>("University/localizations");
    return res.data;
  };
}
