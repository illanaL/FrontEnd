import { FormField } from "../../../components/FormField";
import { useSignupArtisan } from "../hooks/useSignupArtisan";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  signupArtisanStepOneSchema,
  type signupArtisanStepOneData,
} from "../schema/artisan.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Alert } from "../../../components/Alert";
import type { ApiErrorResponse } from "../type/artisan.type";
import axios from "axios";
import { API_ERROR_MESSAGES } from "../../../shared/constants/api-error-messages";

interface Props {
  onNext: () => void;
}

export function SignupArtisanStepOneForm({ onNext }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<signupArtisanStepOneData>({
    resolver: zodResolver(signupArtisanStepOneSchema),
  });

  const { isPending, mutate: signup, isSuccess } = useSignupArtisan();

  const firstName = watch("firstName");
  const lastName = watch("lastName");

  useEffect(() => {
    if (isSuccess) onNext();
  }, [isSuccess, onNext]);

  const [errorData, setErrorData] = useState("");

  const onSubmit: SubmitHandler<signupArtisanStepOneData> = (data) => {
    signup(data, {
      onError: (error) => {
        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          const apiError = error.response?.data?.error;
          const message =
            API_ERROR_MESSAGES[apiError ?? ""] ?? "Une erreur est survenue.";
          setErrorData(message ?? "Une erreur est survenue");
        } else {
          setErrorData("Une erreur inconnue est survenue");
        }
      },
    });
  };

  if (isSuccess) {
    return (
      <div className="bg-bg-soft border border-border rounded-xl p-6 text-center">
        <p className="text-primary font-semibold text-lg">✅ Compte créé !</p>
        <p className="text-sm text-text/60 mt-1">
          Bienvenue {firstName} {lastName}
        </p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Identité */}
        <fieldset className="flex flex-col gap-4">
          <legend className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            Identité
          </legend>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Prénom"
              error={errors.firstName?.message}
              placeholder="Jean"
              {...register("firstName")}
            />
            <FormField
              label="Nom"
              error={errors.lastName?.message}
              placeholder="Dupont"
              {...register("lastName")}
            />
          </div>
          <FormField
            label="Email"
            type="email"
            error={errors.email?.message}
            {...register("email")}
            placeholder="jean@example.com"
          />
          <FormField
            label="Téléphone"
            type="tel"
            error={errors.phone?.message}
            placeholder="0612345678"
            {...register("phone")}
          />
          <FormField
            label="Mot de passe"
            type="password"
            error={errors.password?.message}
            placeholder="8 caractères min."
            {...register("password")}
          />
        </fieldset>
        <button
          type="submit"
          disabled={isPending}
          className="py-3 rounded-xl font-semibold text-white transition-all
          bg-primary hover:bg-primary-hover
          disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isPending ? "Création du compte en cours..." : "Créer mon compte"}
        </button>

        {errorData && <Alert variant="error">{errorData}</Alert>}
      </form>
    </>
  );
}
