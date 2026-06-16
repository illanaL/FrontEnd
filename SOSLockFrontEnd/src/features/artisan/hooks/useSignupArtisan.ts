import { signUpArtisan } from "../api/artisanApi";
import { useMutation } from "@tanstack/react-query";
import { useArtisanAuth } from "../../authentication/hooks/useArtisanAuth";



export const useSignupArtisan = () => {
  return useMutation({
    mutationFn: signUpArtisan,
    onSuccess: (data) => {
      const { accessKey, ...artisan } = data;

      if (accessKey) {
        useArtisanAuth.getState().login(artisan, accessKey, "artisan");
      }
    },
    onError: (error) => {
      console.error("Erreur lors de l'inscription :", error);
    },
  });
};
