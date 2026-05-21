import { useQuery } from "@tanstack/react-query";
import { getArtisanById } from "../api/artisanApi";


export const useGetArtisan = (id: string | undefined) => {
  return useQuery({
    queryKey: ["get-artisan-profile", id],  
    queryFn: () => getArtisanById(id!),
    enabled: !!id,               
    staleTime: 1000 * 60 * 5, 
  });
};

