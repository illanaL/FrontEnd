import api from "../../../client/client";
import type { AdminArtisanResponse } from "../type/adminUser.type";

export const getAllArtisans = async (): Promise<AdminArtisanResponse[]> => {
  const { data } = await api.get<AdminArtisanResponse[]>(
    "/artisans/admin/all"
  );
  return data;
};
