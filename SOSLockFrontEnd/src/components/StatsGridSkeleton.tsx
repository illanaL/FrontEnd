import { Skeleton } from "./Skeleton";

export function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl p-4 flex flex-col h-20 gap-1 bg-slate-100"
        >
          <Skeleton className="w-10 h-6" />
          <Skeleton className="w-20 h-3 mt-2" />
        </div>
      ))}
    </div>
  );
}
