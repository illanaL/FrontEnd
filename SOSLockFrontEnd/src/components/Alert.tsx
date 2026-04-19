import type { PropsWithChildren } from "react";

interface AlertProps {
  variant?: "info" | "warning" | "success" | "error";
  onDismiss?: () => void;
}
export function Alert({
  variant = "info",
  onDismiss,
  children,
}: PropsWithChildren<AlertProps>) {
  const iconMap = {
    info: "ℹ️",
    warning: "⚠️",
    success: "✅",
    error: "❌",
  };

  const colorMap = {
    info: "bg-[#E6F1FB] text-[#185FA5] border-l-4 border-[#378ADD]",
    warning: "bg-[#FAEEDA] text-[#854F0B] border-l-4 border-[#EF9F27]",
    success: "bg-[#EAF3DE] text-[#3B6D11] border-l-4 border-[#639922]",
    error: "bg-[#FCEBEB] text-[#A32D2D] border-l-4 border-[#E24B4A]",
  };

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg ${colorMap[variant]}`}
    >
      <span>{iconMap[variant]}</span>
      <span>{children}</span>
      {onDismiss && <button onClick={onDismiss}>✕</button>}
    </div>
  );
}
