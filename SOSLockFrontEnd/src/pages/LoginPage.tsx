import { useState } from "react";

export const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/artisans/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/artisan";
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h1 className="text-xl font-bold mb-4">Connexion Artisan</h1>

      <input
        placeholder="Email ou téléphone"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        className="w-full border p-2 mb-3 rounded-xl"
      />

      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 mb-4 rounded-xl"
      />

      <button
        onClick={handleLogin}
        className="border-2 rounded-xl  w-full bg-amber-700 text-white py-2"
      >
        Se connecter
      </button>
    </div>
  );
};
