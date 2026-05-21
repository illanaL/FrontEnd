export interface SkeletonProps {
  className: string;
}

export function Skeleton(props: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-slate-700 rounded ${props.className}`}
    ></div>
  );
}
