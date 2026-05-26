import api from "../../../client/client";
import type { ClientRequest } from "../clientRequest.types";

export const getClientRequests = async (): Promise<ClientRequest[]> => {
  try {
    const response = await api.get("/client-requests/");
    return response.data;
  } catch (error: any) {
    console.error("API error:", error?.response?.data || error.message);

    throw new Error(
      error?.response?.data?.error ||
        "Erreur lors de la récupération des client requests",
    );
  }
};
export const getClientRequestsByArtisan = async (
  artisanId: string,
): Promise<ClientRequest[]> => {
  try {
    const response = await api.get<ClientRequest[]>(
      `/client-requests/artisan/${artisanId}`,
    );

    return response.data;
  } catch (error: any) {
    console.error("API error:", error?.response?.data || error.message);

    throw new Error(
      error?.response?.data?.error ||
        "Erreur lors de la récupération des client requests de l'artisan",
    );
  }
};

