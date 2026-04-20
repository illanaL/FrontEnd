import { API_BASE_URL } from "../../../config/api.config";
import type { ClientRequest } from "../clientRequest.types";

export const getClientRequests = async (): Promise<ClientRequest[]> => {
  const res = await fetch(`${API_BASE_URL}/client-requests`);

  if (!res.ok) {
    console.error("Status de l'erreur:", res.status);
    throw new Error("Erreur lors de la récupération des demandes");
  }

  return res.json();
};
