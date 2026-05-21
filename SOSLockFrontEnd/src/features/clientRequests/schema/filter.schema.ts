import { z } from "zod";

export const filterSchema = z.object({
  search:        z.string(),
  filterUrgent:  z.enum(["all", "urgent", "non-urgent"]),
  sortBy:        z.enum(["date", "name", "status"]),
});

export type FilterFormData = z.infer<typeof filterSchema>;