import React, { forwardRef, useId } from "react";

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
}

export const FormField = forwardRef<
  HTMLInputElement,
  FormFieldProps & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, type = "text", placeholder, error, ...rest }, ref) => {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        type={type}
        placeholder={placeholder}
        {...rest}
        className={`px-3 py-2 text-sm border rounded-lg outline-none transition-colors
          focus:ring-2 focus:ring-teal-500
          ${error ? "border-red-500 focus:ring-red-400" : "border-slate-300"}`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});
