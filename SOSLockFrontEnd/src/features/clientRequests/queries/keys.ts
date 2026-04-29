export const clientRequestKeys = {
  all: ["client-requests"] as const,
  list: () => [...clientRequestKeys.all, "list"] as const,
  detail: (id: string) => [...clientRequestKeys.all, "detail", id] as const,
  products: (categoryId: string) =>
    [...clientRequestKeys.all, "products", categoryId] as const,
};