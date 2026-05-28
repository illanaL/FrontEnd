import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaDownload } from "react-icons/fa";
import { Pagination } from "../../../components/Pagination";
import { ArtisanRow } from "../composents/ArtisanRow";
import { useAdminArtisans } from "../hooks/useAdminArtisans";
import { getAllArtisansForExport } from "../api/adminUser.api";

export default function AdminArtisansPage() {
  const navigate = useNavigate();
  const [showDeleted, setShowDeleted] = useState(false);

  const {
    artisans,
    total,
    totalActive,
    totalInactive,
    totalIncomplete,
    totalPages,
    page,
    setPage,
    isPending,
    isError,
    error,
    form,
    availableDepartments,
  } = useAdminArtisans({ showDeleted });

  const { register, reset } = form;

const handleExportCSV = async () => {
  const filters = {
    page: 1,
    limit: 999999,
    search: form.getValues("search") || undefined,
    department: form.getValues("department") || undefined,
    activeFilter: form.getValues("activeFilter") || "all",
    profileFilter: form.getValues("profileFilter") || "all",
    showDeleted,
  };

  const allArtisans = await getAllArtisansForExport(filters);

  const headers = [
    "Nom",
    "Prénom",
    "Email",
    "Téléphone",
    "Statut",
    "Profil",
    "Inscription",
  ];

  const rows = allArtisans.map((a) => [
    a.lastName,
    a.firstName,
    a.email,
    a.phone ?? "",
    a.isActive ? "Actif" : "Inactif",
    a.isProfileComplete ? "Complet" : "Incomplet",
    new Date(a.createdAt).toLocaleDateString("fr-FR"),
  ]);

  const csv = [headers, ...rows].map((r) => r.join(";")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "artisans.csv";
  a.click();

  URL.revokeObjectURL(url);
};


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Gestion des artisans
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {artisans.length} résultat{artisans.length > 1 ? "s" : ""} sur{" "}
              {total} artisan{total > 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              <FaDownload className="w-3.5 h-3.5" />
              Exporter CSV
            </button>

            <button
              onClick={() => setShowDeleted((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition ${
                showDeleted
                  ? "bg-red-50 border-red-300 text-red-600"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaTrash className="w-3.5 h-3.5" />
              {showDeleted ? "Masquer les supprimés" : "Voir les supprimés"}
            </button>

            <button
              onClick={() => navigate("/admin/artisans/create")}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FaPlus className="w-3.5 h-3.5" />
              Nouvel artisan
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total", value: total, color: "text-gray-900" },
            { label: "Actifs", value: totalActive, color: "text-green-600" },
            { label: "Inactifs", value: totalInactive, color: "text-gray-400" },
            { label: "Profils incomplets", value: totalIncomplete, color: "text-orange-500" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
            >
              <p className="text-xs text-gray-500 mb-1">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* FILTERS */}
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
                {availableDepartments.length > 0 &&
                  availableDepartments.map((dep) => (
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

        {/* LOADING / ERROR */}
        {isPending && (
          <div className="text-center py-12 text-gray-400">Chargement...</div>
        )}

        {isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
            {(error as Error)?.message ?? "Erreur lors du chargement"}
          </div>
        )}

        {/* TABLE */}
        {!isPending && !isError && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {showDeleted && (
              <div className="px-4 py-2 bg-red-50 border-b border-red-100 text-xs text-red-600 font-medium">
                Mode supprimés — ces artisans ont été archivés
              </div>
            )}

            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {[
                    "",
                    "Nom",
                    "Email",
                    "Téléphone",
                    "Départements",
                    "Profil",
                    "Statut",
                    "Inscription",
                    "Actions",
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
                    <td colSpan={9} className="text-center py-10 text-gray-400">
                      Aucun artisan trouvé
                    </td>
                  </tr>
                ) : (
                  artisans.map((a) => (
                    <ArtisanRow
                      key={a.id}
                      artisan={a}
                      isDeleted={showDeleted}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Page {page} sur {totalPages}</span>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>

      </div>
    </div>
  );
}
