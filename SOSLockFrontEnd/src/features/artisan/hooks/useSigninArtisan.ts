import { useState } from "react";
import type { ArtisanResponse,  LoginArtisanInput } from "../type/artisan.type";
import { signInArtisan } from "../api/artisanApi";

export function useSigninpArtisan() {
  const [data, setData] = useState<ArtisanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signin = async (input: LoginArtisanInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signInArtisan(input);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.response?.data?.error ?? "Identifiants invalides");
    } finally {
      setIsLoading(false);
    }
  };
  return { signin, data, error, isLoading };
}
