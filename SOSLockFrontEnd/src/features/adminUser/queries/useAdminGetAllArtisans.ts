import { useQuery } from "@tanstack/react-query";
import { artisanKeys } from "../../artisan/queries/artisanKeys";
import { getAllArtisans } from "../api/adminUser.api";

export const useAdminArtisansQuery= () => {
   return useQuery({
    queryKey: artisanKeys.all,
    queryFn:  getAllArtisans,
    staleTime: 1000 * 60 * 5, 
  });

  
}

  