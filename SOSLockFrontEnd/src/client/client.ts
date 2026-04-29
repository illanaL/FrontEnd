import axios from "axios";
import { getToken } from "../infrastrucrure/auth/tokenStorage";

const api = axios.create({
  baseURL: "https://soslockfrance-3381.apps.hostingguru.io",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = `/`;
    }
    return Promise.reject(error);
  },
);

export default api;
