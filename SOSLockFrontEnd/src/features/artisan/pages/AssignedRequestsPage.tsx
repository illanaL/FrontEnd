import { useState, useCallback } from "react";
import { useAuth } from "../../authentication/context/AuthContext";
import { useClientRequestsByArtisan } from "../../clientRequests/hooks/useClientRequestsByArtisan";
import { useToggle } from "../../../hooks/useToggle";
import AdminDashboardClientRequestsPageSkeleton from "../../../pages/ArtisanPageSkeleton";
import { Alert } from "../../../components/Alert";
import { ViewToggle } from "../../clientRequests/components/ViewToggle";
import { GridView } from "../../clientRequests/components/GridView";
import { ListView } from "../../clientRequests/components/ListView";
import { ClientRequestModal } from "../../clientRequests/components/ClientRequestModal";
import { API_BASE_URL } from "../../../config/api.config";

export const AssignedRequestsPage = () => {
  const { artisan } = useAuth();
  const artisanId = artisan?.id ?? "";

  const {
    data: requests = [],
    isLoading,
    isError,
    error,
  } = useClientRequestsByArtisan(artisanId);
  console.log(`${API_BASE_URL}/client-requests/artisan/${artisanId}`);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isModalOpen, toggleModal] = useToggle(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = useCallback(
    (id: string) => {
      setSelectedId(id);
      toggleModal();
    },
    [toggleModal],
  );

  const handleClose = useCallback(() => {
    toggleModal();
    setSelectedId(null);
  }, [toggleModal]);

  const selected = requests.find((r) => r.id === selectedId) ?? null;

  if (isLoading) return <AdminDashboardClientRequestsPageSkeleton />;

  if (isError) {
    return (
      <Alert variant="error">
        {error instanceof Error
          ? error.message
          : "Erreur lors du chargement de vos demandes."}
      </Alert>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mes demandes assignées</h1>
        <ViewToggle viewMode={viewMode} onChange={setViewMode} />
      </div>

      {requests.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-16">
          Aucune demande ne vous est assignée pour le moment.
        </p>
      ) : viewMode === "grid" ? (
        <GridView clientRequests={requests} onSelect={handleSelect} />
      ) : (
        <ListView clientRequests={requests} onSelect={handleSelect} />
      )}

      <ClientRequestModal
        isOpen={isModalOpen}
        clientRequest={selected}
        onClose={handleClose}
      />
    </div>
  );
};

export default AssignedRequestsPage;
