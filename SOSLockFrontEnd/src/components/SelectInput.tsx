import { forwardRef } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  options: Option[];
  error?: string;
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ label, options, error }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <select
          ref={ref}
          className={`border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 transition
            ${error
              ? "border-red-400 focus:ring-red-200"
              : "border-gray-200 focus:ring-amber-200"
            }`}
        >
          <option value="">-- Choisir --</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>                                                                                                                                                                
    );
  }
);

SelectInput.displayName = "SelectInput";