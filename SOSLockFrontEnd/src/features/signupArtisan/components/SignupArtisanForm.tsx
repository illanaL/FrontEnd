import { FormField } from "../../../components/FormField";
import { SkillsField } from "../../../components/SkillFields";
import { useSignupArtisanForm } from "../hooks/useSignupArtisanForm";
import { DepartmentsField } from "./DepartmentsField";

export function SignupArtisanForm() {
  const { form, setForm, errors, submitted, update, handleSubmit } =
    useSignupArtisanForm();

  if (submitted) {
    return (
      <div className="bg-bg-soft border border-border rounded-xl p-6 text-center">
        <p className="text-primary font-semibold text-lg">✅ Compte créé !</p>
        <p className="text-sm text-text/60 mt-1">
          Bienvenue {form.firstName} {form.lastName}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Identité */}
      <fieldset className="flex flex-col gap-4">
        <legend className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
          Identité
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Prénom"
            value={form.firstName}
            error={errors.firstName}
            onChange={update("firstName")}
            placeholder="Jean"
          />
          <FormField
            label="Nom"
            value={form.lastName}
            error={errors.lastName}
            onChange={update("lastName")}
            placeholder="Dupont"
          />
        </div>
        <FormField
          label="Email"
          type="email"
          value={form.email}
          error={errors.email}
          onChange={update("email")}
          placeholder="jean@example.com"
        />
        <FormField
          label="Téléphone"
          type="tel"
          value={form.phone}
          error={errors.phone}
          onChange={update("phone")}
          placeholder="06 12 34 56 78"
        />
        <FormField
          label="Mot de passe"
          type="password"
          value={form.password}
          error={errors.password}
          onChange={update("password")}
          placeholder="8 caractères min."
        />
      </fieldset>

      {/* Entreprise */}
      <fieldset className="flex flex-col gap-4">
        <legend className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
          Entreprise
        </legend>
        <FormField
          label="Nom de société"
          value={form.companyName}
          error={errors.companyName}
          onChange={update("companyName")}
          placeholder="Dupont Serrurerie"
        />
        <FormField
          label="SIRET"
          value={form.siret}
          error={errors.siret}
          onChange={update("siret")}
          placeholder="123 456 789 00012"
        />

        <FormField
          label="IBAN"
          value={form.IBAN}
          error={errors.IBAN}
          onChange={update("IBAN")}
          placeholder="FR76 3000 6000 01..."
        />
      </fieldset>

      <DepartmentsField
        selected={form.departments}
        onChange={(codes) =>
          setForm((prev) => ({ ...prev, departments: codes }))
        }
        error={errors.departments}
      />
      {/* Compétences */}
      <SkillsField
        skills={form.skills}
        onChange={(skills) => setForm((prev) => ({ ...prev, skills }))}
      />
      {errors.skills && <p className="text-xs text-red-500">{errors.skills}</p>}

      {/* Récapitulatif temps réel */}
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
      </div>

      <button
        type="submit"
        disabled={Object.keys(errors).length > 0}
        className="py-3 rounded-xl font-semibold text-white transition-all
    bg-primary hover:bg-primary-hover
    disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Créer mon compte artisan
      </button>
    </form>
  );
}
