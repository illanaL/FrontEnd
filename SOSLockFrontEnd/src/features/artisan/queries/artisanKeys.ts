import type { AdminArtisanQueryParams } from "../type/artisan.type"



export const artisanKeys = {
  all: ["artisans"] as const,

  list: () => [...artisanKeys.all, "list"] as const,

  listWithFilters: (filters: AdminArtisanQueryParams) =>
    [
      ...artisanKeys.all,
      "list",
      filters.page,
      filters.limit,
      filters.search ?? "",
      filters.department ?? "",
      filters.activeFilter ?? "all",
      filters.profileFilter ?? "all",
      filters.showDeleted ?? false,
    ] as const,

  detail: (id: string) => [...artisanKeys.all, "detail", id] as const,
};