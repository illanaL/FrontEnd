import { Skeleton } from "../../../components/Skeleton";

export const ListViewSkeleton = () => {

  return (
    <div className="flex flex-col gap-3">
     {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 border border-gray-200 rounded-xl px-4 py-3"
        >
          {/* Badge "Urgent" */}
          <Skeleton className="w-14 h-6 rounded-full" />

          {/* Titre + sous-titre */}
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="w-64 h-4" />
            <Skeleton className="w-40 h-3" />
          </div>

           {/* Bouton "Voir" */}
          <Skeleton className="w-16 h-9 rounded-lg" />
        </div>
      ))}
    </div>
  );
};
