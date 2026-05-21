import { useState, useMemo } from "react";
import { StatusRequest, type ViewMode } from "../../../data/data";
import { getClientRequests } from "../api/clientRequest.api";
import { useDebounce } from "../../../hooks/useDebounce";
import { filterSchema, type FilterFormData } from "../schema/filter.schema";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { clientRequestKeys } from "../queries/keys";

const urgentMap: Record<FilterFormData["filterUrgent"], boolean | null> = {
  all:         null,
  urgent:      true,
  "non-urgent": false,
};


export const useGetClientRequests = () => {
  const {data: clientRequests, isLoading: loading, error } = useQuery({
     queryKey: clientRequestKeys.all,
     queryFn: getClientRequests,
     
  })
    

   const [viewMode, setViewMode] = useState<ViewMode>("list");


   const { register, control } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search:       "",
      filterUrgent: "all",
      sortBy:       "date",
    },
  });

  const search        = useWatch({ control, name: "search" });
  const filterUrgent  = useWatch({ control, name: "filterUrgent" });
  const sortBy        = useWatch({ control, name: "sortBy" });
 

 const debouncedSearch = useDebounce(search, 300); 

  const filtered = useMemo(() => {
    const urgentFilter = urgentMap[filterUrgent];

    return ( clientRequests ?? [] )
      .filter((i) => {
        const matchSearch = `${i.firstName} ${i.lastName}`
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase());
        const matchUrgent =
          urgentFilter === null || i.isUrgent === urgentFilter ;
        return matchSearch && matchUrgent;
      })
      .sort((a, b) => {
        if (sortBy === "date")
          return (
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime()
          ); 
        if (sortBy === "name") return a.lastName.localeCompare(b.lastName);
        if (sortBy === "status") return a.status.localeCompare(b.status);
        return 0;
      });
  }, [clientRequests, debouncedSearch, filterUrgent, sortBy]);

  const stats = useMemo(
    () => ({
      pending: filtered.filter((i) => i.status === StatusRequest.PENDING).length,
      assigned: filtered.filter((i) => i.status === StatusRequest.ASSIGNED).length,
      completed: filtered.filter((i) => i.status === StatusRequest.COMPLETED).length,
      total: filtered.length,
    }),
    [filtered],
  );

  return {
    loading,
    error,
    register,
    control,
    viewMode,
    setViewMode,
    filtered,
    stats,
  };
};
