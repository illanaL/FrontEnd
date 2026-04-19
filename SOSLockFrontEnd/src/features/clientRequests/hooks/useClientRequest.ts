import { useState, useMemo } from "react";
import { mockClientRequest, StatusRequest, type SortBy, type ViewMode } from "../../../data/data";



export const useClientRequest = () => {
  const [search, setSearch] = useState("");
  const [filterUrgent, setFilterUrgent] = useState<boolean | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const filtered = useMemo(() => {
    return mockClientRequest
      .filter((i) => {
        const matchSearch = `${i.firstName} ${i.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchUrgent =
          filterUrgent === null || i.isUrgent === filterUrgent;
        return matchSearch && matchUrgent;
      })
      .sort((a, b) => {
        if (sortBy === "date")
          return b.createdAt.getTime() - a.createdAt.getTime();
        if (sortBy === "name")
          return a.lastName.localeCompare(b.lastName);
        if (sortBy === "status")
          return a.status.localeCompare(b.status);
        return 0;
      });
  }, [search, filterUrgent, sortBy]);

  
  const stats = useMemo(() => ({
    pending: filtered.filter((i) => i.status === StatusRequest.PENDING).length,
    assigned: filtered.filter((i) => i.status === StatusRequest.ASSIGNED).length,
    completed: filtered.filter((i) => i.status === StatusRequest.COMPLETED).length,
    total: filtered.length,
  }), [filtered]);

  return {
    search, setSearch,
    filterUrgent, setFilterUrgent,
    sortBy, setSortBy,
    viewMode, setViewMode,
    filtered,
    stats,
  };
};