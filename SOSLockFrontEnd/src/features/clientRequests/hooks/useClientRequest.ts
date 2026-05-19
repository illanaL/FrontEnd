import { useState, useMemo } from "react";
import { StatusRequest, type SortBy, type ViewMode } from "../../../data/data";
import { getClientRequests } from "../api/clientRequest.api";
import { useDebounce } from "../../../hooks/useDebounce";
import { useAsync } from "../../../hooks/useAsync";

export const useClientRequest = () => {
  const {data: clientRequests, loading, error } = useAsync(
    () => getClientRequests(),
    []
  )

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300); 
  const [filterUrgent, setFilterUrgent] = useState<boolean | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

 

  const filtered = useMemo(() => {
    return ( clientRequests ?? [] )
      .filter((i) => {
        const matchSearch = `${i.firstName} ${i.lastName}`
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase());
        const matchUrgent =
          filterUrgent === null || i.isUrgent === filterUrgent;
        return matchSearch && matchUrgent;
      })
      .sort((a, b) => {
        if (sortBy === "date")
          return (
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime()
          ); // ← string → Date pour le tri
        if (sortBy === "name") return a.lastName.localeCompare(b.lastName);
        if (sortBy === "status") return a.status.localeCompare(b.status);
        return 0;
      });
  }, [clientRequests, debouncedSearch, filterUrgent, sortBy]);

  const stats = useMemo(
    () => ({
      pending: filtered.filter((i) => i.status === StatusRequest.PENDING)
        .length,
      assigned: filtered.filter((i) => i.status === StatusRequest.ASSIGNED)
        .length,
      completed: filtered.filter((i) => i.status === StatusRequest.COMPLETED)
        .length,
      total: filtered.length,
    }),
    [filtered],
  );

  return {
    loading,
    error,
    search,
    setSearch,
    filterUrgent,
    setFilterUrgent,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    filtered,
    stats,
  };
};
