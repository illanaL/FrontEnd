import type { Category } from "../type/products.type"

export const productsKeys = {
  all: ["products"] as const,
  list: () => [...productsKeys.all, "list"] as const,
  detail: (id: string) => [...productsKeys.all, "detail", id] as const,
  byCategory: (category : Category | string | null) => 
  [...productsKeys.all, "category", category] as const,
};