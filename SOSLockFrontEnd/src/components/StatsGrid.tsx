interface Stat {
  label: string;
  value: number;
  color?: "yellow" | "blue" | "green" | "red";
}

interface StatsGridProps {
  stats: Stat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  const colorMap: Record<string, string> = {
    yellow: "bg-yellow-50 text-yellow-700",
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-xl p-4 flex flex-col h-20 gap-1 ${colorMap[stat.color ?? "blue"]}`}
        >
          <span className="text-2xl font-semibold w-4 h-4">{stat.value}</span>
          <span className="text-sm  mt-2 h-2">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}