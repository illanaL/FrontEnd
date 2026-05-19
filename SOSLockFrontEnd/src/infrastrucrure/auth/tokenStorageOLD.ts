import type { Artisan } from "../../features/artisan/type/artisan.type";
import { useAuthStore } from "../../features/authentication/stores/authStore";

export const getToken = (): string | null => {
  const stored = useAuthStore.getState().token
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    return parsed.accessKey;
  } catch {
    return null;
  }
};

export const setToken = (artisan: Artisan, data: any) => {
  useAuthStore().login(artisan, JSON.stringify(data));
};

export const clearToken = () => {
  useAuthStore().logout();
};