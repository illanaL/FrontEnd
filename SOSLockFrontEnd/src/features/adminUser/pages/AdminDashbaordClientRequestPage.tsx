import { useCallback, useRef, useState } from "react";
import { StatsGrid } from "../../../components/StatsGrid";
import { SortBar } from "../../clientRequests/components/SortBar";
import { ViewToggle } from "../../clientRequests/components/ViewToggle";
import { GridView } from "../../clientRequests/components/GridView";
import { ListView } from "../../clientRequests/components/ListView";
import { ClientRequestModal } from "../../clientRequests/components/ClientRequestModal";
import { Tabs } from "../../../components/Tabs";
import { StatusRequest } from "../../../data/data";
import { useToggle } from "../../../hooks/useToggle";
import AdminDashboardClientRequestsPageSkeleton from "../../../pages/ArtisanPageSkeleton";
import type { FilterFormData } from "../../clientRequests/schema/filter.schema";
import { useWatch } from "react-hook-form";
import { Alert } from "../../../components/Alert";
import { useGetClientRequests } from "../../clientRequests/hooks/useGetClientRequests";

const URGENT_OPTIONS: {
  value: FilterFormData["filterUrgent"];
  label: string;
  activeClass: string;
}[] = [
  { value: "all", label: "Tous", activeClass: "bg-amber-700 text-white" },
  { value: "urgent", label: "Urgent", activeClass: "bg-red-600 text-white" },
  {
    value: "non-urgent",
    label: "Non urgent",
    activeClass: "bg-green-600 text-white",
  },
];

export const AdminDashbaordClientRequestPage = () => {
  const {
    loading,
    error,
    register,
    control,
    viewMode,
    setViewMode,
    filtered,
    stats,
  } = useGetClientRequests();

  const [isModalOpen, toggleModal] = useToggle(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    toggleModal();
  };

  const selected = filtered.find((i) => i.id === selectedId) ?? null;

  const handleClose = () => {
    toggleModal();
    setSelectedId(null);
  };

  const filterUrgentValue = useWatch({ control, name: "filterUrgent" });

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const { ref: registerRef, ...searchProps } = register("search");

  const mergedRef = useCallback(
    (el: HTMLInputElement | null) => {
      registerRef(el);
      searchInputRef.current = el;
    },
    [registerRef],
  );

  const focusSearch = useCallback(() => {
    setTimeout(() => searchInputRef.current?.focus(), 50);
  }, []);

  const statsDisplay = [
    { label: "En attente", value: stats.pending, color: "yellow" as const },
    { label: "En cours", value: stats.assigned, color: "blue" as const },
    { label: "Terminées", value: stats.completed, color: "green" as const },
    { label: "Total", value: stats.total, color: "red" as const },
  ];

  const renderList = useCallback(
    (data: typeof filtered) =>
      data.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-8">
          Aucune demande dans cette catégorie
        </p>
      ) : viewMode === "grid" ? (
        <GridView clientRequests={data} onSelect={handleSelect} />
      ) : (
        <ListView clientRequests={data} onSelect={handleSelect} />
      ),
    [viewMode, handleSelect],
  );

  if (loading) {
    return <AdminDashboardClientRequestsPageSkeleton />;
  }

  if (error) {
    return (
      <p className="p-8 text-red-500">
        {" "}
        Erreur : {error instanceof Error ? error.message : "Erreur inconnue"}
      </p>
    );
  }

  if (error) {
    return (
      <Alert variant="error">
        {"Erreur lors du chargement du profil artisan."}
      </Alert>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Tableau de bord des demandes d'interventions
      </h1>

      <StatsGrid stats={statsDisplay} />

      <Tabs>
        <Tabs.Tab label="Vue Globale (Filtres)" onSelect={focusSearch}>
          <div className="flex flex-col gap-4 mb-6">
            <input
              {...searchProps}
              ref={mergedRef}
              type="text"
              placeholder="Rechercher par nom..."
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {URGENT_OPTIONS.map(({ value, label, activeClass }) => (
                  <label key={value} className="cursor-pointer">
                    <input
                      {...register("filterUrgent")}
                      type="radio"
                      value={value}
                      className="sr-only"
                    />
                    <span
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        filterUrgentValue === value
                          ? activeClass
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {label}
                    </span>
                  </label>
                ))}
              </div>
              <div className="flex gap-4">
                <SortBar register={register} control={control} />
                <ViewToggle viewMode={viewMode} onChange={setViewMode} />
              </div>
            </div>
          </div>
          {renderList(filtered)}
        </Tabs.Tab>
        <Tabs.Tab label="À traiter">
          {renderList(
            filtered.filter((i) => i.status === StatusRequest.PENDING),
          )}
        </Tabs.Tab>

        <Tabs.Tab label="En cours">
          {renderList(
            filtered.filter((i) => i.status === StatusRequest.ASSIGNED),
          )}
        </Tabs.Tab>

        <Tabs.Tab label="Terminées">
          {renderList(
            filtered.filter((i) => i.status === StatusRequest.COMPLETED),
          )}
        </Tabs.Tab>
      </Tabs>

      <ClientRequestModal
        isOpen={isModalOpen}
        clientRequest={selected}
        onClose={handleClose}
      />
    </div>
  );
};

export default AdminDashbaordClientRequestPage;
