import { FormField } from "../../../components/FormField";
import {
  Controller,
  useFieldArray,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import {
  signupArtisanStepTwoSchema,
  type signupArtisanStepTwoData,
} from "../schema/artisan.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DepartmentsField } from "./DepartmentsField";
import { useUpdateArtisan } from "../hooks/useUpdateArtisan";
import { useAuthStore } from "../../authentication/stores/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { SkillsV3Field } from "../../../components/SkillFieldsV3";

interface Props {
  onNext?: () => void;
  isEditMode?: boolean;
}

export function SignupArtisanFormStepTwoForm({
  onNext,
  isEditMode = false,
}: Props) {
  const { isPending, mutate: update } = useUpdateArtisan();
  const artisan = useAuthStore((s) => s.artisan);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<signupArtisanStepTwoData>({
    resolver: zodResolver(signupArtisanStepTwoSchema),
    defaultValues: isEditMode
      ? {
          companyName: artisan?.companyName ?? "",
          siret: artisan?.siret ?? "",
          IBAN: artisan?.IBAN ?? "",
          departments: artisan?.departments ?? [],
          skills: artisan?.skills.map((skill) => ({ value: skill })) ?? [],
        }
      : undefined,
  });

  const {
    fields: skills,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "skills",
  });

  const onSubmit: SubmitHandler<signupArtisanStepTwoData> = (data) => {
    if (!artisan?.id) return;

    update(
      { id: artisan.id, data },
      {
        onSuccess: () => {
          (queryClient.invalidateQueries({
            queryKey: ["artisan", artisan.id],
          }),
            onNext?.());
        },
      },
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <fieldset className="flex flex-col gap-4">
          <legend className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            {isEditMode ? "Modifier mon profil entreprise" : "Entreprise"}
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

          <Controller
            name="skills"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <SkillsV3Field
                onChange={field.onChange}
                error={errors.skills?.message}
                append={append}
                count={skills.length}
              />
            )}
          />
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={skill.id}
                className="flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium"
              >
                {skill.value}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="hover:text-red-500 transition-colors"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={isPending}
          className="py-3 rounded-xl font-semibold text-white transition-all bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isPending
            ? "Enregistrement..."
            : isEditMode
              ? "Enregistrer les modifications"
              : "Terminer mon inscription"}
        </button>
      </form>
    </>
  );
}
