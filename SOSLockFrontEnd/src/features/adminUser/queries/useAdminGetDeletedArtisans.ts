import { useQuery } from "@tanstack/react-query";
import { artisanKeys } from "../../artisan/queries/artisanKeys";
import { getDeletedArtisans } from "../api/adminUser.api";
import type { AdminArtisanQueryParams } from "../../artisan/type/artisan.type";

export const useAdminDeletedArtisansQuery = (filters: AdminArtisanQueryParams) => {
  return useQuery({
    queryKey: [...artisanKeys.all, "deleted", filters.page, filters.limit],
    queryFn: () =>
      getDeletedArtisans({
        page: filters.page ?? 1,
        limit: filters.limit ?? 10,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
