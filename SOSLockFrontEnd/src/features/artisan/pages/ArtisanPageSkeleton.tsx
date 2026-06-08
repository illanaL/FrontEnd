import { Skeleton } from "../../../components/Skeleton";
import { StatsGridSkeleton } from "../../../components/StatsGridSkeleton";
import { ListViewSkeleton } from "../../clientRequests/components/ListViewSkeleton";

export const AdminDashboardClientRequestsPageSkeleton = () => {
  return (
    <div className="p-8">
      {/* h1 "Tableau de bord Artisan" */}
      <Skeleton className="mb-6 h-8 w-64" />

      {/* Bouton Déconnexion */}
      <Skeleton className="mb-4 h-9 w-28" />

      {/* StatsGrid */}
      <StatsGridSkeleton />

      {/* Tabs — les 5 onglets */}
      <div className="flex gap-2 mt-6 mb-4 border-b border-gray-200 pb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-28 rounded-md" />
        ))}
      </div>
      {/* Contenu actif de l'onglet */}
      <ListViewSkeleton />
    </div>
  );
};
export default AdminDashboardClientRequestsPageSkeleton;
