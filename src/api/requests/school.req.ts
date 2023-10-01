import { api } from "@/api/api.config";
import { Api } from "@/models/api.model";
import { IGetSchoolsReq, School } from "@/models/school.model";

export namespace SchoolApi {
  export const getSchoolInfo = async (id: string) => {
    const res = await api.get<Api<School>>("University/by-id", {
      params: { id },
    });
    return res.data;
  };

  export const getSchools = async (data: IGetSchoolsReq) => {
    const res = await api.get<Api<School[]>>("University/query", {
      params: data,
    });
    return res.data;
  };
}
