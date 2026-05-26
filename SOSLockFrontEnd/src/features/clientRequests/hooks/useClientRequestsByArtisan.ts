import { useQuery } from "@tanstack/react-query";
import { getClientRequestsByArtisan } from "../api/clientRequest.api";
import { clientRequestKeys } from "../queries/keys";

export const useClientRequestsByArtisan = (artisanId: string) => {
  return useQuery({
    queryKey: clientRequestKeys.byArtisan(artisanId),
    queryFn: () => getClientRequestsByArtisan(artisanId),
    enabled: !!artisanId, 
    staleTime: 1000 * 60 * 2, 
    gcTime: 1000 * 60 * 10, 
  });
};