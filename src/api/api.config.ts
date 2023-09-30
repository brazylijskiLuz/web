import { env } from "@/config";
import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";
import { useLanguageStore } from "@/stores/lang.store";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  const lang = useLanguageStore.getState().lang;
  config.headers["Accept-Language"] = lang;
  config.headers["Content-Language"] = lang;

  return config;
});
