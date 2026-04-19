import type { PropsWithChildren, ReactNode } from "react";

interface CardProps {
  title: ReactNode;
  variant?: "elevated" | "outlined" | "default";
}
export function Card({
  title,
  variant = "default",
  children,
}: PropsWithChildren<CardProps>) {
  const variants = {
    default: "border border-gray-200",
    outlined: "border-2 border-gray-300",
    elevated: "border border-gray-200 shadow-sm",
  };

  return (
    <>
      <div
        className={`bg-white rounded-2xl p-6 w-full flex flex-col gap-4 items-start ${variants[variant]}`}
      >
        <div className="flex items-start gap-4">{title}</div>

        {children}
      </div>
    </>
  );
}
