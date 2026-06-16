import { useUserAuth } from "../../authentication/hooks/useUserAuthMutations";
import { useGetClientRequestsByUser } from "../../clientRequests/hooks/useGetClientRequestsByUser";

const STATUS_CONFIG = {
  PENDING: {
    label: "En attente d'un serrurier",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    icon: "⏳",
  },
  ASSIGNED: {
    label: "Serrurier assigné",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: "🔧",
  },
  COMPLETED: {
    label: "Intervention terminée",
    color: "bg-teal-100 text-teal-700 border-teal-200",
    icon: "✅",
  },
  CANCELLED: {
    label: "Annulée",
    color: "bg-red-100 text-red-700 border-red-200",
    icon: "❌",
  },
  EXPIRED: {
    label: "Expirée",
    color: "bg-neutral-100 text-neutral-500 border-neutral-200",
    icon: "🕐",
  },
} as const;

export default function DashboardUserPage() {   

  const { userId } = useUserAuth();
  if(!userId) {
    return (
      <div className="min-h-screen bg-bg-soft flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg
            className="h-8 w-8 animate-spin text-teal-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <p className="text-sm text-text/50">Chargement de vos demandes…</p>
        </div>
      </div>
    );
  }

  const { data: requests, isPending, error } = useGetClientRequestsByUser(userId);

  if (isPending) {
    return (
      <div className="min-h-screen bg-bg-soft flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg
            className="h-8 w-8 animate-spin text-teal-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <p className="text-sm text-text/50">Chargement de vos demandes…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg-soft flex items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-700">
          Une erreur est survenue : {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-soft">
      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-extrabold text-text">
            Mes demandes d'intervention
          </h1>
          <p className="text-sm text-text/50 mt-1">
            Suivez l'état de vos demandes en temps réel
          </p>
        </div>

        {/* Liste vide */}
        {!requests || requests.length === 0 ? (
          <div className="rounded-2xl border border-border bg-bg p-10 flex flex-col items-center gap-3 text-center">
            <span className="text-4xl">🔐</span>
            <p className="font-semibold text-text">Aucune demande pour le moment</p>
            <p className="text-sm text-text/50">
              Vos demandes d'intervention apparaîtront ici après leur création.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {requests.map((request) => {
              const status = STATUS_CONFIG[request.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.PENDING;

              return (
                <div
                  key={request.id}
                  className="rounded-2xl border border-border bg-bg p-5 flex flex-col gap-4 shadow-sm"
                >
                  {/* Header card */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-text/40">
                        Demande du{" "}
                        {new Date(request.createdAt!).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <p className="font-semibold text-text">
                        {request.addressRequest.street},{" "}
                        {request.addressRequest.zipCode}{" "}
                        {request.addressRequest.city}
                      </p>
                    </div>

                    {/* Badge statut */}
                    <span
                      className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${status.color}`}
                    >
                      {status.icon} {status.label}
                    </span>
                  </div>

                  {/* Infos */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-text/60">
                    {request.description && (
                      <div className="col-span-2 sm:col-span-3">
                        <span className="font-medium text-text/40 uppercase text-[10px]">Description</span>
                        <p className="mt-0.5 text-text/70">{request.description}</p>
                      </div>
                    )}
                    {request.isUrgent && (
                      <div className="col-span-2 sm:col-span-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-medium border border-red-200">
                          🚨 Intervention urgente
                        </span>
                      </div>
                    )}
                    {request.preferredDate && (
                      <div>
                        <span className="font-medium text-text/40 uppercase text-[10px] block">Date souhaitée</span>
                        {request.preferredDate}
                      </div>
                    )}
                    {request.photos && request.photos.length > 0 && (
                      <div>
                        <span className="font-medium text-text/40 uppercase text-[10px] block">Photos</span>
                        {request.photos.length} ajoutée{request.photos.length > 1 ? "s" : ""}
                      </div>
                    )}
                  </div>

                  {/* Photos miniatures */}
                  {request.photos && request.photos.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {request.photos.map((url, i) => (
                        <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                          <img
                            src={url}
                            alt={`Photo ${i + 1}`}
                            className="h-16 w-16 rounded-lg object-cover border border-border hover:opacity-80 transition-opacity"
                          />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Barre de progression */}
                  <div className="flex items-center gap-2 pt-1">
                    {["PENDING", "ASSIGNED", "COMPLETED"].map((s, i) => {
                      const steps = ["PENDING", "ASSIGNED", "COMPLETED"];
                      const currentIndex = steps.indexOf(request.status);
                      const isDone = i <= currentIndex;
                      const isCancelled = request.status === "CANCELLED" || request.status === "EXPIRED";

                      return (
                        <div key={s} className="flex items-center gap-2 flex-1">
                          <div
                            className={`h-2 rounded-full w-full transition-all ${
                              isCancelled
                                ? "bg-neutral-200"
                                : isDone
                                ? "bg-teal-500"
                                : "bg-neutral-200"
                            }`}
                          />
                        </div>
                      );
                    })}
                    <span className="text-xs text-text/40 shrink-0">
                      {request.status === "COMPLETED"
                        ? "Terminé"
                        : request.status === "CANCELLED"
                        ? "Annulé"
                        : request.status === "EXPIRED"
                        ? "Expiré"
                        : "En cours"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}