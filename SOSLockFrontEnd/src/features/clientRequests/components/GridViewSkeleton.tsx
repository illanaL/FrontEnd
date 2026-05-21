import { Skeleton } from "../../../components/Skeleton";


export const GridViewSkeleton = () => {
  const clientResquestMock = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:8},{id:9},{id:10} ]
  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {clientResquestMock.map((i) => (
      <div
        key={i.id}
        className="border rounded-xl p-4 flex flex-col gap-2 hover:shadow-md transition-shadow"
      >
        <Skeleton className="font-medium text-sm"/>
        <Skeleton className="text-xs text-gray-400"/>
        <div className="flex items-center justify-between mt-auto">
          <Skeleton className="px-2.5 py-0.5 rounded-full" />
          <Skeleton className="rounded-full"/ >
           
        </div>
      </div>
    ))}
  </div>
  )
}