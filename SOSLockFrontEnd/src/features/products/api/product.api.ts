import axios from "axios";
import type { Product } from "../../clientRequests/clientRequest.types";
import api from "../../../client/client";


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