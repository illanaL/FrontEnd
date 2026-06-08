import axios from "axios";
import api from "../../../client/client";
import type { Category, Product } from "../type/products.type";


export const getProductsByCategory = async (
  category: Category,
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
