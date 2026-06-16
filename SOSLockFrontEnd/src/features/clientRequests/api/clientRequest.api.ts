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

export interface CreateClientRequestPayload {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  addressRequest: {
    number: string;
    street: string;
    zipCode: string;
    city: string;
  };
  description: string;
  photos?: string[];
  preferredDate?: Date;
  isUrgent: boolean;
  productIds: string[];
}

export interface CreateClientRequestResponse {
  clientRequest: ClientRequest;
  checkoutUrl: string;
  sessionId: string;
  quoteId: string;
}

export const createClientRequest = async (
  payload: CreateClientRequestPayload,
): Promise<CreateClientRequestResponse> => {
  try {
    const response = await api.post<CreateClientRequestResponse>(
      "/client-requests",
      payload,
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.error ||
        "Erreur lors de la création de la demande",
    );
  }
};

export const getClientRequestsByUser = async (
  userId: string,
): Promise<ClientRequest[]> => {
  try {
    const response = await api.get<ClientRequest[]>(
      `/client-requests/user/${userId}`,
    );

    return response.data;
  } catch (error: any) {
    console.error("API error:", error?.response?.data || error.message);

    throw new Error(
      error?.response?.data?.error ||
        "Erreur lors de la récupération des client requests de l'utilisateur",
    );
  }
};
