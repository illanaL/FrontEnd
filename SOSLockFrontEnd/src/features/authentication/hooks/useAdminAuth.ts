import { create } from "zustand";
import type { AdminAuthState } from "../stores/authStore";
import { persist } from "zustand/middleware";

export const useAdminAuth = create<AdminAuthState>()(
  persist(
    (set) => ({
      admin: null,
      token: null,
      isAuthenticated: false,
      role: null,

      login: (admin, token) =>
        set(() => {
          localStorage.setItem("accessKey", token);
          return {
            admin,
            token,
            role: "admin" as const,
            isAuthenticated: true,
          };
        }),

      logout: () =>
        set(() => {
          localStorage.removeItem("accessKey");
          return {
            admin: null,
            token: null,
            role: null,
            isAuthenticated: false,
          };
        }),
    }),
    { name: "admin-auth-state" }
  )
);