interface FormFieldProps {
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (value: string) => void;
}

export function FormField({
  label,
  type = "text",
  value,
  placeholder,
  error,
  onChange,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`px-3 py-2 text-sm border rounded-lg outline-none transition-colors
          focus:ring-2 focus:ring-teal-500
          ${error ? "border-red-500 focus:ring-red-400" : "border-slate-300"}`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
