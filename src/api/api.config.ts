import { env } from "@/config";
import axios from "axios";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_API_URL,
});