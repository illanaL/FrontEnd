import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Artisan } from "../../artisan/type/artisan.type";

type Role = "artisan" | "user" | "admin";

interface AuthState {
  artisan: Artisan | null;
  token: string | null;
  isAuthenticated: boolean;
  role: Role | null;

  login: (artisan: Artisan, token: string, role: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      artisan: null,
      token: null,
      isAuthenticated: false,
      role: null,

      
      login: (artisan, token, role) =>
        set(() => {
          localStorage.setItem("accessKey", token); 
          return {
            artisan,
            token,
            role,
            isAuthenticated: true,
          };
        }),

      
      logout: () =>
        set(() => {
          localStorage.removeItem("accessKey");
          return {
            artisan: null,
            token: null,
            role: null,
            isAuthenticated: false,
          };
        }),
    }),
    {
      name: "auth-state",
    }
  )
);
