import { useState } from "react";
import { useAuth } from "../features/authentication/context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  

  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login({ phone, password });
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h1 className="text-xl font-bold mb-4">Connexion Artisan</h1>

      <input
        placeholder="Email ou téléphone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-2 mb-3 rounded-xl"
      />
      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2  pr-10 rounded-xl"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="border-2 rounded-xl  w-full bg-amber-700 text-white py-2 disabled:opacity-50"
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </div>
  );
};
