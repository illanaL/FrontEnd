const badgeColors = {
  green:  "bg-green-50 text-green-700",
  yellow: "bg-yellow-50 text-yellow-700",
  red:    "bg-red-50 text-red-700",
  gray:   "bg-gray-100 text-gray-500",
} as const;

export function BadgeArtisan({
  value,
  labelTrue,
  labelFalse,
  colorTrue,
  colorFalse,
}: {
  value: boolean;
  labelTrue: string;
  labelFalse: string;
  colorTrue: keyof typeof badgeColors;
  colorFalse: keyof typeof badgeColors;
}) {
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
        value ? badgeColors[colorTrue] : badgeColors[colorFalse]
      }`}
    >
      {value ? labelTrue : labelFalse}
    </span>
  );
}