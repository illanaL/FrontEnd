import { ArtisanRow } from "../composents/ArtisanRow";
import { useAdminArtisans } from "../hooks/useAdminArtisans";

export default function AdminArtisansPage() {
  const {
    artisans,
    total,
    isPending,
    isError,
    error,
    form,
    availableDepartments,
  } = useAdminArtisans();

  const { register, reset } = form;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* En-tête */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des artisans
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {artisans.length} résultat{artisans.length > 1 ? "s" : ""} sur{" "}
            {total} artisan{total > 1 ? "s" : ""}
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Nom ou prénom
              </label>
              <input
                {...register("search")}
                type="text"
                placeholder="Rechercher..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Département
              </label>
              <select
                {...register("department")}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Tous</option>
                {availableDepartments.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Statut
              </label>
              <select
                {...register("activeFilter")}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">Tous</option>
                <option value="active">Actifs</option>
                <option value="inactive">Inactifs</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Profil
              </label>
              <select
                {...register("profileFilter")}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">Tous</option>
                <option value="complete">Complet</option>
                <option value="incomplete">Incomplet</option>
              </select>
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => reset()}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* États */}
        {isPending && (
          <div className="text-center py-12 text-gray-400">Chargement...</div>
        )}
        {isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
            {(error as Error)?.message ?? "Erreur lors du chargement"}
          </div>
        )}

        {/* Tableau */}
        {!isPending && !isError && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {[
                    "Nom",
                    "Email",
                    "Téléphone",
                    "Départements",
                    "Profil",
                    "Statut",
                    "Email vérifié",
                    "Inscription",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 font-medium text-gray-600"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {artisans.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-10 text-gray-400"
                    >
                      Aucun artisan trouvé
                    </td>
                  </tr>
                ) : (
                  artisans.map((a) => <ArtisanRow key={a.id} artisan={a} />)
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}