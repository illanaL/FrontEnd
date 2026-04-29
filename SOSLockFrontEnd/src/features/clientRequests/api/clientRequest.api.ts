import api from "../../../client/client";
import type { ClientRequest, Product } from "../clientRequest.types";

export const getClientRequests = async (): Promise<ClientRequest[]> => {
  const res = await api.get<ClientRequest[]>(`/client-requests/`);

  return res.data;
};

export const getProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  const res = await api.get<Product[]>(`/products/category/${category}`);
  return res.data;
};
