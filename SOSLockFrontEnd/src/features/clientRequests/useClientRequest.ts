import { useEffect, useMemo, useState } from "react";
import type { ClientRequest } from "./clientRequest.types";
import type { SortBy,  ViewMode } from "../../data/data";
import {StatusRequest} from "../../data/data";
import { getClientRequests } from "./api/clientRequest.api";

export const useClientRequest = () => {
  const [clientRequets, setClientRequests] = useState<ClientRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filterUrgent, setFilterUrgent] = useState<boolean | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getClientRequests();
        setClientRequests(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return clientRequets
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
          return (
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime()
          );
        if (sortBy === "name") return a.lastName.localeCompare(b.lastName);
        if (sortBy === "status") return a.status.localeCompare(b.status);
        return 0;
      });
  }, [clientRequets, search, filterUrgent, sortBy]);

  const stats = useMemo(() => ({
    pending: filtered.filter((i) => i.status === StatusRequest.PENDING).length,
    assigned: filtered.filter((i) => i.status === StatusRequest.ASSIGNED)
      .length,
    completed: filtered.filter((i) => i.status === StatusRequest.COMPLETED)
      .length,
    total: filtered.length,
  }), [filtered])

  return {
    loading,
    error,
    search, setSearch,
    filterUrgent, setFilterUrgent,
    sortBy, setSortBy,
    viewMode, setViewMode,
    filtered,
    stats,
  }
};
