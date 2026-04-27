import { useNavigate } from "react-router-dom";

export const ArtisanCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-bg-soft py-16 px-6 text-center border-t border-border">
      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">
        🔧 Vous êtes artisan serrurier ?
      </span>

      <h2 className="text-3xl font-extrabold text-text mb-4">
        Rejoignez le réseau SOSLock
      </h2>

      <p className="text-text/70 max-w-xl mx-auto mb-8">
        Recevez des demandes d'intervention près de chez vous, gérez votre
        planning et développez votre activité. Inscription gratuite.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate("/signup-artisan")}
          className="bg-primary hover:bg-primary-hover text-text-light px-8 py-3 rounded-xl font-semibold shadow-lg"
        >
          S'inscrire comme artisan
        </button>
        <button 
        onClick={() => navigate("/artisans/signIn")}
        className="border border-border text-text px-8 py-3 rounded-xl font-semibold hover:bg-border/20">
          Se connecter
        </button>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
        {[
          { icon: "📍", title: "Interventions locales", desc: "Recevez uniquement les demandes dans vos départements" },
          { icon: "💳", title: "Paiement sécurisé", desc: "Encaissez directement via la plateforme" },
          { icon: "⭐", title: "Visibilité accrue", desc: "Votre profil mis en avant auprès des clients" },
        ].map((item) => (
          <div key={item.title} className="bg-bg rounded-xl p-5 border border-border shadow-sm">
            <span className="text-2xl mb-2 block">{item.icon}</span>
            <h3 className="font-bold text-text mb-1">{item.title}</h3>
            <p className="text-sm text-text/60">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};