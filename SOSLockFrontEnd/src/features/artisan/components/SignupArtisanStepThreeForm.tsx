import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../authentication/stores/authStore";

export function SignupArtisanStepThreeForm() {
  const navigate = useNavigate();
  const artisan = useAuthStore((s) => s.artisan);

  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      {/* Icône succès */}
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
        ✅
      </div>

      {/* Titre */}
      <div>
        <h2 className="text-2xl font-bold text-text">Inscription terminée !</h2>
        <p className="text-sm text-text/60 mt-1">
          Bienvenue sur SOSLock, {artisan?.firstName} {artisan?.lastName}
        </p>
      </div>

      {/* Récapitulatif */}
      <div className="w-full bg-bg-soft border border-border rounded-xl p-5 text-left flex flex-col gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Récapitulatif
        </p>

        <Row label="Nom" value={`${artisan?.firstName} ${artisan?.lastName}`} />
        <Row label="Email" value={artisan?.email} />
        <Row label="Téléphone" value={artisan?.phone} />
        <Row label="Société" value={artisan?.companyName} />
        <Row label="SIRET" value={artisan?.siret} />

        {artisan?.skills?.length ? (
          <Row label="Compétences" value={artisan.skills.join(", ")} />
        ) : null}

        {artisan?.departments?.length ? (
          <Row label="Départements" value={artisan.departments.join(", ")} />
        ) : null}
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate("/dashboard")}
        className="w-full py-3 rounded-xl font-semibold text-white
        bg-primary hover:bg-primary-hover transition-all"
      >
        Accéder à mon tableau de bord
      </button>
    </div>
  );
}

// ─── Sous-composant ligne récap ───────────────────────────────────────────────
function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex justify-between text-sm">
      <span className="text-text/50 font-medium">{label}</span>
      <span className="text-text font-semibold">{value}</span>
    </div>
  );
}
