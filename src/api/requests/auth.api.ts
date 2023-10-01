import { api } from "@/api/api.config";
import { Api } from "@/models/api.model";

export namespace AuthApi {
  export interface LoginReq {
    email: string;
    password: string;
  }
  export interface LoginRes {
    jwt: string;
  }

  export const login = async (data: LoginReq) => {
    const res = await api.post<Api<LoginRes>>("Login", data);
    return res.data;
  };
  export const getRefreshToken = async () => {
    const res = await api.post<Api<LoginRes>>("RefreshToken", {});

    return res.data;
  };
}
