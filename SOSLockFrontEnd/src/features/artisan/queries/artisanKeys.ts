
export const artisanKeys = {
  all: ["artisans"] as const,
  list: () => [...artisanKeys.all, "list"] as const,
  detail: (id: string) => [...artisanKeys.all, "detail", id] as const,
};