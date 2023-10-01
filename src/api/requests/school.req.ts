import { api } from "@/api/api.config";
import { Api } from "@/models/api.model";
import { School } from "@/models/school.model";

export namespace SchoolApi {
  export const getSchoolInfo = async (id: string) => {
    const res = await api.get<Api<any>>("University/by-id", {
      params: { id },
    });
    return res.data;
  };
}
