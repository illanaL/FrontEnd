import { useState } from "react";
import type { ClientRequestFormData } from "../clientRequest.types";
import { useDebounce } from "../../../hooks/useDebounce";
import { useProductsByCategory } from "../../products/hooks/useProductsByCategory";

interface Props {
  formdata: ClientRequestFormData;
  update: (field: keyof ClientRequestFormData, value: unknown) => void;
}

export const Step2Products = ({ formdata: formData, update }: Props) => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useProductsByCategory(formData.categoryId);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const filteredProducts = products?.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  const toggle = (id: string) => {
    const already = formData.productIds.includes(id);
    update(
      "productIds",
      already
        ? formData.productIds.filter((p) => p !== id)
        : [...formData.productIds, id],
    );
  };
  console.log("productIds après:", formData.productIds);
  if (isLoading)
    return <p className="text-center text-sos-400 py-8">Chargement...</p>;
  if (isError)
    return <p className="text-center text-red-400 py-8">{error.message}</p>;
  if (products?.length === 0)
    return (
      <p className="text-center text-sos-400 py-8">Aucun produit disponible</p>
    );

  return (
    <div>
      <h2 className="text-xl font-bold text-sos-900 mb-2">
        Quelle prestation souhaitez-vous ?
      </h2>
      <p className="text-sos-500 text-sm mb-4">
        Vous pouvez sélectionner plusieurs prestations
      </p>

      <input
        type="text"
        placeholder="Rechercher une prestation..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border-2 border-sos-200 rounded-xl px-4 py-3 text-sm text-sos-900 outline-none focus:ring-2 focus:ring-sos-300 mb-6 transition-all"
      />

      {filteredProducts?.length === 0 && (
        <p className="text-center text-sos-400 py-4 text-sm">
          Aucune prestation ne correspond à votre recherche
        </p>
      )}

      <div className="flex flex-col gap-3">
        {filteredProducts?.map((product) => {
          const selected = formData.productIds.includes(product.id);

          return (
            <button
              key={product.id}
              type="button"
              onClick={() => toggle(product.id)}
              className={`border rounded-xl p-2 text-left transition-all flex items-center justify-between
                ${
                  selected
                    ? "border-sos-700 bg-sos-50 shadow-md"
                    : "border-sos-200 bg-white hover:border-sos-400"
                }`}
            >
              <div>
                <p
                  className={`text-base font-semibold ${selected ? "text-sos-700" : "text-sos-900"}`}
                >
                  {product.name}
                </p>
                {product.description && (
                  <p className="text-sm text-sos-400 mt-1">
                    {product.description}
                  </p>
                )}
              </div>

              <div className="text-right ml-4 flex flex-col items-end gap-2">
                <div>
                  <span
                    className={`text-xl font-bold ${selected ? "text-sos-700" : "text-sos-900"}`}
                  >
                    {product.price}
                  </span>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                  ${
                    selected
                      ? "bg-sos-700 border-sos-700 text-white"
                      : "border-sos-300"
                  }`}
                >
                  {selected && "✓"}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {formData.productIds.length === 0 && (
        <p className="text-xs text-red-400 mt-4">
          Sélectionnez au moins une prestation
        </p>
      )}
    </div>
  );
};
