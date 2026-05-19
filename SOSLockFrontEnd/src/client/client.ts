import axios from "axios";
import { useAuthStore } from "../features/authentication/stores/authStore";

const api = axios.create({
  baseURL: "https://soslockfrance-3381.apps.hostingguru.io",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const { data } = await api.post('/auth/refresh')
                const currentRole = useAuthStore.getState().role;
                useAuthStore.getState().login(data.user, data.token, currentRole!)
                originalRequest.headers.Authorization = `Bearer ${data.token}`
                return api(originalRequest)
            } catch {
                useAuthStore.getState().logout()
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export default api;
