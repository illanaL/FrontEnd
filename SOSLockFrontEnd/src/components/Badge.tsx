export interface BadgeProps {
  label: string;
  color?: "blue" | "green" | "red" | "yellow";
}

const colorMap = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
  yellow: "bg-yellow-100 text-yellow-700",
};

export function Badge({label, color  = 'blue'}:BadgeProps) {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[color]}`}>
      {label}</span>
  )
}
