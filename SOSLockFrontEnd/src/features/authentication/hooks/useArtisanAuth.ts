import { create } from "zustand";
import type { ArtisanAuthState } from "../stores/authStore";
import { persist } from "zustand/middleware";

export const useArtisanAuth = create<ArtisanAuthState>()(
  persist(
    (set) => ({
      artisan: null,
      token: null,
      isAuthenticated: false,
      role: null,

      
      login: (artisan, token, role) => {
        localStorage.setItem("accessKey", token);
        set({
          artisan,
          token,
          role,
          isAuthenticated: true,
        });
      },

      
      logout: () => {
        localStorage.removeItem("accessKey");
        set({
          artisan: null,
          token: null,
          role: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "artisan-auth-state",
    }
  )
);