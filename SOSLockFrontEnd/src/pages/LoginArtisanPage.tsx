import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../features/authentication/context/AuthContext";
import { FormField } from "../components/FormField";
import {
  loginByPhoneSchema,
  type LoginByPhoneForm,
} from "../features/authentication/schema/login.schema";

export const LoginArtisanPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginByPhoneForm>({
    resolver: zodResolver(loginByPhoneSchema),
  });

  const onSubmit: SubmitHandler<LoginByPhoneForm> = async (data) => {
    setServerError(null);
    try {
      await login(data);
    } catch (e: any) {
      setServerError(e.message);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h1 className="text-xl font-bold mb-4">Connexion Artisan</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          label="Téléphone"
          type="tel"
          placeholder="0612345678"
          error={errors.phone?.message}
          {...register("phone")}
        />

        {/* Champ password : FormField + bouton toggle superposé */}
        <div className="relative">
          <FormField
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            error={errors.password?.message}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {serverError && (
          <p className="text-red-500 text-sm text-left">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="border-2 rounded-xl w-full bg-green-600 hover:bg-primary-hover text-white py-2 disabled:opacity-50"
        >
          {isSubmitting ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
};

export default LoginArtisanPage;
