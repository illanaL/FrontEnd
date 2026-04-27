import { useNavigate } from "react-router-dom";
import serrure from "../../../assets/serrure1.jpg";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section
      className="relative text-text-light py-20 px-6"
      style={{
        backgroundImage: `url(${serrure})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-teal-900/50" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <span className="bg-red-500/20 text-red-200 px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">
            🚨 Disponible 24h/24
          </span>

          <h1 className="text-4xl font-extrabold mb-4">
            Trouvez un serrurier fiable <br />
            en quelques minutes
          </h1>

          <p className="text-text-light mb-6">
            Intervention rapide, artisans vérifiés, prix transparents.
          </p>

          <button
            onClick={() => navigate("/demande")}
            className="bg-primary hover:bg-primary-hover text-text-light px-6 py-3 rounded-xl font-semibold shadow-lg"
          >
            Faire une demande
          </button>
        </div>

        <div className="flex-1 bg-bg text-text rounded-2xl shadow-xl p-6 w-full max-w-md">
          <h3 className="font-bold mb-4">Demande rapide</h3>

          <input
            className="w-full border border-border p-3 mb-3 rounded-lg bg-bg-soft text-text"
            placeholder="Votre problème"
          />
          <input
            className="w-full border border-border p-3 mb-4 rounded-lg bg-bg-soft text-text"
            placeholder="Ville"
          />

          <button className="w-full bg-primary hover:bg-primary-hover text-text-light py-3 rounded-lg">
            Envoyer
          </button>
        </div>
      </div>
    </section>
  );
};
