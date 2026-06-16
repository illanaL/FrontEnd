import { useNavigate } from "react-router-dom";

type ProfileType = "user" | "artisan";


const WelcomePage = () => {

    const navigate = useNavigate();
    

    function onSelectProfile(profile: ProfileType) {
        if (profile === "user") {
            navigate("/users/signIn");
        } else {
            navigate("/artisan/dashboard");
        }
    }

  return (
    <main className="flex-grow flex flex-col items-center justify-center py-16 px-4">
      {/* Welcome Message */}
      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-headline-xl font-headline-xl text-primary mb-4 md:text-headline-xl text-headline-lg-mobile">
          Bienvenue chez SOSLock
        </h1>

        <p className="text-body-lg font-body-lg text-on-surface-variant">
          Veuillez sélectionner votre profil pour accéder à votre espace dédié
          et bénéficier de nos services de serrurerie ultra-fiables.
        </p>
      </div>

      {/* Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
        {/* Customer Card */}
        <div
          className="card-hover group relative flex flex-col bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer"
          onClick={() => onSelectProfile("user")}
        >
          <div className="h-48 relative overflow-hidden bg-primary-container flex items-center justify-center">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-transparent" />
            </div>

            <div className="relative z-10 w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border border-white/20 glass-overlay">
              <span
                className="material-symbols-outlined text-white text-5xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                home
              </span>
            </div>
          </div>

          <div className="p-8 flex flex-col flex-grow bg-white">
            <h2 className="text-headline-md font-headline-md text-primary mb-2">
              Espace Client
            </h2>

            <p className="text-body-md font-body-md text-on-surface-variant mb-4">
              Trouver un serrurier
            </p>

            <p className="text-body-md font-body-md text-on-surface opacity-70 mb-8">
              Besoin d'une intervention urgente ou d'un devis ? Accédez à notre
              réseau d'artisans certifiés en quelques clics.
            </p>

            <button className="mt-auto w-full py-4 bg-secondary text-on-secondary font-bold rounded-lg flex items-center justify-center gap-2 group-hover:bg-secondary-container transition-colors active:scale-95 transition-transform">
              Continuer
              <span className="material-symbols-outlined">
                arrow_forward
              </span>
            </button>
          </div>

          <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/20 rounded-xl pointer-events-none" />
        </div>

        {/* Artisan Card */}
        <div
          className="card-hover group relative flex flex-col bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer"
          onClick={() => onSelectProfile("artisan")}
        >
          <div className="h-48 relative overflow-hidden bg-tertiary-container flex items-center justify-center">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-tertiary-fixed-dim to-transparent" />
            </div>

            <div className="relative z-10 w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border border-white/20 glass-overlay">
              <span
                className="material-symbols-outlined text-tertiary-fixed-dim text-5xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                handyman
              </span>
            </div>
          </div>

          <div className="p-8 flex flex-col flex-grow bg-white">
            <h2 className="text-headline-md font-headline-md text-primary mb-2">
              Espace Artisan
            </h2>

            <p className="text-body-md font-body-md text-on-surface-variant mb-4">
              Accès Professionnel
            </p>

            <p className="text-body-md font-body-md text-on-surface opacity-70 mb-8">
              Gérez vos interventions, suivez vos clients et développez votre
              activité professionnelle avec les outils SOSLock.
            </p>

            <button className="mt-auto w-full py-4 bg-tertiary-fixed-dim text-on-tertiary-fixed font-bold rounded-lg flex items-center justify-center gap-2 group-hover:bg-tertiary-fixed transition-colors active:scale-95 transition-transform">
              Se connecter
              <span className="material-symbols-outlined">login</span>
            </button>
          </div>

          <div className="absolute inset-0 border-2 border-transparent group-hover:border-tertiary-fixed-dim/20 rounded-xl pointer-events-none" />
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-success-green">
            verified_user
          </span>
          <span className="text-label-md font-label-md uppercase tracking-wider">
            Artisans Certifiés
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-success-green">
            lock
          </span>
          <span className="text-label-md font-label-md uppercase tracking-wider">
            Sécurisé &amp; Garanti
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-success-green">
            schedule
          </span>
          <span className="text-label-md font-label-md uppercase tracking-wider">
            Disponibilité 24/7
          </span>
        </div>
      </div>
    </main>
  );
};

export default WelcomePage;