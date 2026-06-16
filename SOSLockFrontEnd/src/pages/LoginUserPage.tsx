import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FormField } from "../components/FormField";
import {
  loginByPhoneSchema,
  type LoginByPhoneForm,
} from "../features/authentication/schema/login.schema";
import { useNavigate } from "react-router-dom";
import { authUserApi } from "../features/authentication/api/authUser.api";

export const LoginUserPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  
  const navigate = useNavigate();
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
      await authUserApi.login(data);
      navigate("/user/dashboard");

    } catch (e: any) {
      setServerError(e.response?.data?.message || e.message || "Une erreur est survenue lors de la connexion.");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h1 className="text-xl font-bold mb-4">Connexion Client</h1>

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
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {serverError && (
          <p className="text-red-500 text-sm text-left font-medium">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="border-2 border-transparent rounded-xl w-full bg-green-600 hover:bg-green-700 text-white py-2 font-medium disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
};

export default LoginUserPage;