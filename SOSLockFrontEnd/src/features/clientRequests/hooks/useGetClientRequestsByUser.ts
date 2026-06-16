import { useQuery } from "@tanstack/react-query";
import { clientRequestKeys } from "../queries/keys";
import { getClientRequestsByUser } from "../api/clientRequest.api";

export const useGetClientRequestsByUser = (userId: string) => {
  return useQuery({
    queryKey: clientRequestKeys.byUser(userId),
    queryFn: () => getClientRequestsByUser(userId),
    enabled: !!userId, 
    staleTime: 1000 * 60 * 2, 
    gcTime: 1000 * 60 * 10, 
  });
};