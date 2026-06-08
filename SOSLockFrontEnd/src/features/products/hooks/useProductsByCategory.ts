import { getProductsByCategory } from "../api/product.api";
import { productsKeys } from "../queries/keys";
import type { Category, Product } from "../type/products.type";
import { useQuery } from "@tanstack/react-query";

export const useProductsByCategory = (category : Category | null) => {
    return useQuery<Product[]> ({
        queryKey: productsKeys.byCategory(category),
        queryFn: async () => {
            if(!category) return [];
            return getProductsByCategory(category)
        },
        enabled: !!category,
        // Évite l'effet de clignotement blanc (loader) quand on change de catégorie
        placeholderData: (previousData) => previousData, 
    })
    
}