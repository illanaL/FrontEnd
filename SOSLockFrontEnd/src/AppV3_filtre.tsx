import { StatsGrid } from "./components/StatsGrid";
import { useState } from "react";
import { useClientRequest } from "./features/clientRequests/hooks/useClientRequest";
import { SortBar } from "./features/clientRequests/components/SortBar";
import { ViewToggle } from "./features/clientRequests/components/ViewToggle";
import { GridView } from "./features/clientRequests/components/GridView";
import { ListView } from "./features/clientRequests/components/ListView";
import { ClientRequestModal } from "./features/clientRequests/components/ClientRequestModal";

function App() {
  const {
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
  } = useClientRequest();

  const [modalOuverte, setModalOuverte] = useState<string | null>(null);

  const statsDisplay = [
    { label: "En attente", value: stats.pending, color: "yellow" as const },
    { label: "En cours", value: stats.assigned, color: "blue" as const },
    { label: "Terminées", value: stats.completed, color: "green" as const },
    { label: "Total", value: stats.total, color: "red" as const },
  ];

  const selected = filtered.find((i) => i.id === modalOuverte) ?? null;

  return (
    <div className="p-8">
      <StatsGrid stats={statsDisplay} />

      <input
        type="text"
        placeholder="Rechercher une demande"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mb-4"
      />

      <div className="flex items-center justify-between mb-2">
        <SortBar sortBy={sortBy} onChange={setSortBy} />
        <ViewToggle viewMode={viewMode} onChange={setViewMode} />
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilterUrgent(null)}
          className={`px-3 py-1 rounded-lg text-sm border ${filterUrgent === null ? "bg-amber-700 text-white" : "text-gray-500"}`}
        >
          Tous
        </button>
        <button
          onClick={() => setFilterUrgent(true)}
          className={`px-3 py-1 rounded-lg text-sm border ${filterUrgent === true ? "bg-red-600 text-white" : "text-gray-500"}`}
        >
          Urgent
        </button>
        <button
          onClick={() => setFilterUrgent(false)}
          className={`px-3 py-1 rounded-lg text-sm border ${filterUrgent === false ? "bg-green-600 text-white" : "text-gray-500"}`}
        >
          Non urgent
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-8">
          Aucun résultat trouvé
        </p>
      ) : viewMode === "grid" ? (
        <GridView clientRequests={filtered} onSelect={setModalOuverte} />
      ) : (
        <ListView clientRequests={filtered} onSelect={setModalOuverte} />
      )}
      <ClientRequestModal
        clientRequest={selected}
        onClose={() => setModalOuverte(null)}
      />
    </div>
  );
}
export default App;
