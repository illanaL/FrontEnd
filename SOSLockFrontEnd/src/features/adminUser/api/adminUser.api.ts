import api from "../../../client/client";
import type { PaginatedResponse } from "../../../shared/constants/type";
import type { AdminArtisanQueryParams } from "../../artisan/type/artisan.type";
import type { AdminArtisanResponse } from "../type/adminUser.type";

export const getAllArtisans = async (
  params: AdminArtisanQueryParams
): Promise<PaginatedResponse<AdminArtisanResponse>> => {
  const { data } = await api.get<
    PaginatedResponse<AdminArtisanResponse>
  >("/artisans/admin/all", {
    params,
  });

  return data;
};

export const getAllArtisansForExport = async (filters: AdminArtisanQueryParams) => {
  const { data } = await api.get<
    PaginatedResponse<AdminArtisanResponse>
  >("/artisans/admin/all", {
    params: {
      ...filters,
      page: 1,
      limit: 999999,
    },
  });

  return data.data;
};

export const getDeletedArtisans = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<PaginatedResponse<AdminArtisanResponse>> => {
  const { data } = await api.get<
    PaginatedResponse<AdminArtisanResponse>
  >("/artisans/admin/deleted", {
    params: { page, limit },
  });

  return data;
};
