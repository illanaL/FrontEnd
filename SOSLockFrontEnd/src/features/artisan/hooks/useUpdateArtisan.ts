
import { useMutation } from "@tanstack/react-query";
import { updateArtisan } from "../api/artisanApi";
import { useNavigate } from "react-router-dom";



export const useUpdateArtisan = () => {
       const navigate = useNavigate()
  return useMutation({
    mutationFn: (data) => {
      const {id, updateData} = data
      return (
      updateArtisan(id, updateData)
      )
    } ,
    onSuccess: () => 
    navigate('/artisans'),
    onError: (error) => {
      console.error("Erreur lors de la modification :", error);
    },
  });
};
