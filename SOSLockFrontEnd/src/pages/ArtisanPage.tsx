import { useState } from "react";
import { useClientRequest } from "../features/clientRequests/hooks/useClientRequest";
import { StatsGrid } from "../components/StatsGrid";
import { SortBar } from "../features/clientRequests/components/SortBar";
import { ViewToggle } from "../features/clientRequests/components/ViewToggle";
import { GridView } from "../features/clientRequests/components/GridView";
import { ListView } from "../features/clientRequests/components/ListView";
import { ClientRequestModal } from "../features/clientRequests/components/ClientRequestModal";
import { Tabs } from "../components/Tabs";
import { StatusRequest } from "../data/data";
import { Accordion } from "../components/Accordion";
import { useAuth } from "../features/authentication/context/AuthContext";

export const ArtisanPage = () => {
  const {
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
  } = useClientRequest();

  const [modalOuverte, setModalOuverte] = useState<string | null>(null);
  const selected = filtered.find((i) => i.id === modalOuverte) ?? null;

  const { logout } = useAuth()

  const statsDisplay = [
    { label: "En attente", value: stats.pending, color: "yellow" as const },
    { label: "En cours", value: stats.assigned, color: "blue" as const },
    { label: "Terminées", value: stats.completed, color: "green" as const },
    { label: "Total", value: stats.total, color: "red" as const },
  ];

  const renderList = (data: any[]) =>
    data.length === 0 ? (
      <p className="text-gray-400 text-sm text-center py-8">
        Aucune demande dans cette catégorie
      </p>
    ) : viewMode === "grid" ? (
      <GridView clientRequests={data} onSelect={setModalOuverte} />
    ) : (
      <ListView clientRequests={data} onSelect={setModalOuverte} />
    );

  if (loading) return <p className="p-8 text-gray-500">Chargement...</p>;
  if (error) return <p className="p-8 text-red-500">Erreur : {error}</p>;
  const token = localStorage.getItem("token");

  if (!token) {
    return <p>Accès refusé</p>;
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord Artisan</h1>

      <button onClick={() => logout()}>Déconnexion</button>
      <StatsGrid stats={statsDisplay} />

      <Tabs>
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

        <Tabs.Tab label="Vue Globale (Filtres)">
          <div className="flex flex-col gap-4 mb-6">
            <input
              type="text"
              placeholder="Rechercher par nom..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterUrgent(null)}
                  className={`px-3 py-1 rounded ${filterUrgent === null ? "bg-amber-700 text-white" : "bg-gray-100"}`}
                >
                  Tous
                </button>
                <button
                  onClick={() => setFilterUrgent(true)}
                  className={`px-3 py-1 rounded ${filterUrgent === true ? "bg-red-600 text-white" : "bg-gray-100"}`}
                >
                  Urgent
                </button>
                <button
                  onClick={() => setFilterUrgent(false)}
                  className={`px-3 py-1 rounded ${filterUrgent === false ? "bg-green-600 text-white" : "bg-gray-100"}`}
                >
                  Non urgent
                </button>
              </div>
              <div className="flex gap-4">
                <SortBar sortBy={sortBy} onChange={setSortBy} />
                <ViewToggle viewMode={viewMode} onChange={setViewMode} />
              </div>
            </div>
          </div>
          {renderList(filtered)}
        </Tabs.Tab>

        <Tabs.Tab label="Profil">
          <Accordion>
            <Accordion.Item title="Informations personnelles">
              Email : Illana@bootcode.from Adresse : 11 allee des magnolias
              Villemomble Tel : 0612456789
            </Accordion.Item>
            <Accordion.Item title="Informations Entreprises">
              Nom de la société : JTP Serrurier Siret : 789456123 Addresse : 1
              rue telma Aix
            </Accordion.Item>
            <Accordion.Item title="Compétences">
              Serrurerie, Blindage, Dépannage
            </Accordion.Item>
          </Accordion>
        </Tabs.Tab>
      </Tabs>

      <ClientRequestModal
        clientRequest={selected}
        onClose={() => setModalOuverte(null)}
      />
    </div>
  );
};
