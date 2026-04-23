import { forwardRef } from "react";

interface TextAreaProps {
  label: string;
  placeholder?: string;
  error?: string;
  rows?: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, placeholder, error, rows = 4 }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <textarea
          ref={ref}
          placeholder={placeholder}
          rows={rows}
          className={`border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 transition resize-none
            ${
              error
                ? "border-red-400 focus:ring-red-200"
                : "border-gray-200 focus:ring-amber-200"
            }`}
        />
        {error && 
        <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

TextArea.displayName = "TextArea"
