import { forwardRef } from "react";

interface TextInputProps {
    label: string;
    placeholder?: string;
    error?: string;
    type?: string;
}


export const TextInput = forwardRef<HTMLInputElement, TextInputProps> (
    ({label, placeholder, error, type}, ref) => {
        return (
            <>
            <div className="felx flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <input 
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={`border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 transition
            ${error
            ? "border-red-400 focus:ring-red-200"
            : "border-gray-200 focus:ring-amber-200"}`}
            />
            {error && (
            <p className="text-xs text-red-500">{error}</p>)}
            </div>
            </>
        )
    }
)

TextInput.displayName = "TextInput";