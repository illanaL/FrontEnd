import { FormField } from "../../../components/FormField";
import { useSignupArtisan } from "../hooks/useSignupArtisan";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  signupArtisanStepTwoSchema,
  type signupArtisanStepTwoData,
} from "../schema/artisan.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DepartmentsField } from "./DepartmentsField";
import { SkillsV2Field } from "../../../components/SkillFieldsV2";
import { useUpdateArtisan } from "../hooks/useUpdateArtisan";
import { useArtisanStore } from "../hooks/useArtisanStore";

export function SignupArtisanFormStepTwoForm() {
  const navigate = useNavigate();
  const { isPending, mutate: update } = useUpdateArtisan();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<signupArtisanStepTwoData>({
    resolver: zodResolver(signupArtisanStepTwoSchema),
  });

  const artisanConnected = useArtisanStore((state) => state.artisanConnected);

  const onSubmit: SubmitHandler<signupArtisanStepTwoData> = (data) => {
    if (!artisanConnected?.id) return;

    update({ id: artisanConnected.id, data });
  };

  const { isSuccess } = useSignupArtisan();

  useEffect(() => {
    if (isSuccess) {
      navigate("/signupArtisanStepTwo");
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Entreprise */}
        <fieldset className="flex flex-col gap-4">
          <legend className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            Entreprise
          </legend>
          <FormField
            label="Nom de société"
            error={errors.companyName?.message}
            placeholder="Dupont Serrurerie"
            {...register("companyName")}
          />
          <FormField
            label="SIRET"
            error={errors.siret?.message}
            placeholder="123 456 789 00012"
            {...register("siret")}
          />

          <FormField
            label="IBAN"
            error={errors.IBAN?.message}
            placeholder="FR76 3000 6000 01..."
            {...register("IBAN")}
          />

          <Controller
            name="departments"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <DepartmentsField
                selected={field.value ?? []}
                onChange={field.onChange}
                error={errors.departments?.message}
              />
            )}
          />
          {/* Compétences */}
          <Controller
            name="skills"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <SkillsV2Field
                value={field.value ?? []}
                onChange={field.onChange}
                error={errors.skills?.message}
              />
            )}
          />
        </fieldset>
        <button
          type="submit"
          disabled={isPending}
          className="py-3 rounded-xl font-semibold text-white transition-all
          bg-primary hover:bg-primary-hover
          disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isPending ? "Enregistrement..." : "Terminer mon inscription"}
        </button>
      </form>
    </>
  );
}

/*   Récapitulatif temps réel 
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
          Récapitulatif
        </p>
        <p>
          <span className="font-medium">Nom :</span> {form.firstName}{" "}
          {form.lastName}
        </p>
        <p>
          <span className="font-medium">Email :</span> {form.email}
        </p>
        <p>
          <span className="font-medium">Société :</span> {form.companyName}
        </p>
        <p>
          <span className="font-medium">Compétences :</span>{" "}
          {form.skills.join(", ") || "—"}
        </p>
      </div>*/
