export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  totalActive: number;
  totalInactive: number;
  totalIncomplete: number;
  page: number;
  limit: number;
  totalPages: number;
};
