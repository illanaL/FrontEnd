import axios from "axios";
import api from "../../../client/client";
import type { ClientRequest, Product } from "../clientRequest.types";

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

export const getProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  try {
    const res = await api.get<Product[]>(`/products/category/${category}`);
    return res.data;
  } catch (error) {

    if (axios.isAxiosError(error) && error.response?.status === 400) {
      return [];  
    } 

    console.error("Error fetching products by category:", error);
    throw error;
  }
};

