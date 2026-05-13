/*import { useForm } from "react-hook-form";
import { useSignupArtisan } from "../hooks/useSignupArtisan";
import {
  signupArtisanSchema,
  type SignupArtisanFormData,
} from "../schema/artisan.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition";

const labelClass = "block text-sm font-medium text-gray-700 mb-1";

const errorClass = "mt-1 text-xs text-red-500";

export function SignupArtisanForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignupArtisanFormData>({
    resolver: zodResolver(signupArtisanSchema),
  });
  const navigate = useNavigate();

  const { mutate, isSuccess } = useSignupArtisan();

  const onSubmit = async (data: SignupArtisanFormData) => {
    mutate(data);
  };

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  useEffect(() => {
    if (isSuccess) {
      navigate("/signupArtisanStepTwoData");
    }
  }, [isSuccess, navigate]);

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex 
    flex-col gap-5"
    >
     
      <h2 className="flex flex-col gap-4">
        <legend className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
          Identité
        </legend>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            Prénom
          </label>
          <input
            {...register("firstName")}
            placeholder="Prénom"
            className={inputClass}
          />
          <p className={errorClass}>
            {errors.firstName && (
              <span className="error">{errors.firstName.message}</span>
            )}
          </p>
        </div>

        <div>
          <label htmlFor="lastName" className={labelClass}>
            Nom
          </label>
          <input {...register("lastName")} className={inputClass} />
          <p className={errorClass}>
            {errors.lastName && (
              <span className="error">{errors.lastName.message}</span>
            )}
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input {...register("email")} className={inputClass} />
        <p className={errorClass}>
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </p>
      </div>
      <div>
        <label htmlFor="phone" className={labelClass}>
          Téléphone
        </label>
        <input {...register("phone")} className={inputClass} />
        <p className={errorClass}>
          {errors.phone && (
            <span className="error">{errors.phone.message}</span>
          )}
        </p>
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>
          Mot de passe
        </label>
        <input {...register("password")} className={inputClass} />
        <p className={errorClass}>
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="py-3 rounded-xl font-semibold text-white transition-all
    bg-primary hover:bg-primary-hover
    disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Création du compte..." : "Créer mon compte artisan"}
      </button>
    </form>
  );
}*/

import { SignupArtisanStepOneForm } from "./SignupArtisanStepOneForm";
import { SignupArtisanFormStepTwoForm } from "./SignupArtisanStepTwoForm";

export function SignupArtisanForm() {
  return (
    <>
      <SignupArtisanStepOneForm />

      <SignupArtisanFormStepTwoForm />
    </>
  );
}
