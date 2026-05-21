import { useWatch, type Control, type UseFormRegister } from "react-hook-form";
import type { SortBy } from "../../../data/data";
import type { FilterFormData } from "../schema/filter.schema";

interface Props {
  register: UseFormRegister<FilterFormData>;
  control: Control<FilterFormData>;
}

const OPTIONS: { value: SortBy; label: string }[] = [
  { value: "date", label: "Date" },
  { value: "name", label: "Nom" },
  { value: "status", label: "Statut" },
];

export const SortBar = ({ register, control }: Props) =>  {
  const current = useWatch({ control, name: "sortBy" });

  return (
  <div className="flex items-center gap-2 mb-4">
    <span className="text-sm text-gray-500">Trier par :</span>
    {OPTIONS.map((opt) => (
      <label key={opt.value} className="cursor-pointer">
       <input
            {...register("sortBy")}
            type="radio"
            value={opt.value}
            className="sr-only" 
          />
           <span
            className={`px-3 py-1 rounded-lg text-sm border transition-colors ${
              current === opt.value
                ? "bg-amber-700 text-white border-amber-700"
                : "text-gray-500 border-gray-200 hover:border-amber-700"
            }`}
          >
            {opt.label}
          </span>
        </label>
    ))}
  </div>
  );
  }