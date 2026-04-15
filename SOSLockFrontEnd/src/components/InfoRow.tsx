interface InfoRowProps {
  label: string
  value: string
}

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <>
    <div className="flex justify-between items-center py-1">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
    </>
  )
}