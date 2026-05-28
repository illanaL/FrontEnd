import { useQuery } from "@tanstack/react-query";
import { artisanKeys } from "../../artisan/queries/artisanKeys";
import { getAllArtisans } from "../api/adminUser.api";
import type { AdminArtisanQueryParams } from "../../artisan/type/artisan.type";

export const useAdminArtisansQuery = (filters: AdminArtisanQueryParams) => {
  return useQuery({
    queryKey: artisanKeys.listWithFilters(filters),
    queryFn: () => getAllArtisans(filters),
    staleTime: 1000 * 60 * 5,
  });
};
