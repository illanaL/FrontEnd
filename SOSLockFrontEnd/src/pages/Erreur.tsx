import { Link } from "react-router-dom";
import {
  FaHome,
  FaUserTie,
  FaUserShield,
  FaFlask,
  FaKey,
} from "react-icons/fa";
import type { JSX } from "react";

export function Erreur(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 text-center px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-slate-700 mb-8">
        Oups... cette page n'existe pas.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Link
          to="/"
          className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow hover:scale-105 transition"
        >
          <FaHome className="text-2xl text-teal-500" />
          <span>Accueil</span>
        </Link>

        <Link
          to="/artisans/SignIn"
          className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow hover:scale-105 transition"
        >
          <FaKey className="text-2xl text-blue-500" />
          <span>Sign In Artisan</span>
        </Link>
        <Link
          to="/artisans"
          className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow hover:scale-105 transition"
        >
          <FaUserTie className="text-2xl text-blue-500" />
          <span>Artisan</span>
        </Link>

        <Link
          to="/admin"
          className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow hover:scale-105 transition"
        >
          <FaUserShield className="text-2xl text-purple-500" />
          <span>Admin</span>
        </Link>

        <Link
          to="/exo"
          className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow hover:scale-105 transition"
        >
          <FaFlask className="text-2xl text-orange-500" />
          <span>Exercices</span>
        </Link>
      </div>

      <Link to="/" className="mt-10 text-sm text-teal-600 hover:underline">
        ← Retour à l'accueil
      </Link>
    </div>
  );
}
