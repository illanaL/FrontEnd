import z from "zod/v3";

export const filterArtisanSchema = z.object({
  search:        z.string(),
  department:    z.string(),
  activeFilter:  z.enum(["all", "active", "inactive"]),
  profileFilter: z.enum(["all", "complete", "incomplete"]),
});

export type FilterArtisanForm = z.infer<typeof filterArtisanSchema>;