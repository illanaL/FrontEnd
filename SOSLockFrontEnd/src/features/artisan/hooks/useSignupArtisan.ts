import { signUpArtisan } from "../api/artisanApi";
import { useMutation } from "@tanstack/react-query";
import { useArtisanStore } from "./useArtisanStore";

export const useSignupArtisan = () => {
        const setArtisanConnected = useArtisanStore((s) => s.setArtisanConnected);
  return useMutation({
    mutationFn: signUpArtisan,
    onSuccess: (data) => {
      setArtisanConnected(data)
    },
    onError: (error) => {
      console.error("Erreur lors de l'inscription :", error);
    },
  });
};
