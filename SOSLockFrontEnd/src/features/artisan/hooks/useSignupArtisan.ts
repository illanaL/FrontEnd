import { useAuthStore } from "../../authentication/stores/authStore";
import { signUpArtisan } from "../api/artisanApi";
import { useMutation } from "@tanstack/react-query";



export const useSignupArtisan = () => {
  return useMutation({
    mutationFn: signUpArtisan,
    onSuccess: (data) => {
      const { accessKey, ...artisan } = data;

      if (accessKey) {
        useAuthStore.getState().login(artisan, accessKey, "artisan");
      }
    },
    onError: (error) => {
      console.error("Erreur lors de l'inscription :", error);
    },
  });
};
