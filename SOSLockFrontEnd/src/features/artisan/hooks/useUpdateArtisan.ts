import { useMutation } from "@tanstack/react-query";
import { updateArtisan } from "../api/artisanApi";
import { useNavigate } from "react-router-dom";
import type { UpdateArtisanInput } from "../type/artisan.type";


export const useUpdateArtisan = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["update-artisan"],
    mutationFn: ({ id, data }: { id: string; data: UpdateArtisanInput }) => {
      return updateArtisan(id, data);
    },
    onSuccess: () => navigate("/artisans"),
    onError: (error) => {
      console.error("Erreur lors de la modification :", error);
    },
  });
};
