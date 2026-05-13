import { create } from "zustand";
import type { Artisan } from "../type/artisan.type";
import { persist } from "zustand/middleware";

interface ArtisanState {
  artisanConnected: Artisan | null;
  setArtisanConnected: (artisan: Artisan) => void;
}

export const useArtisanStore = create<ArtisanState>()(
  persist(
    (set) => ({
      artisanConnected: null,
      setArtisanConnected: (artisan: Artisan) => {
        set({ artisanConnected: artisan });
      },
    }),
    { name: "artisanStore" },
  ),
);
