import { useState } from "react";
import { FormField } from "./FormField";
import { SkillsField } from "./SkillFields";

interface ArtisanFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  companyName: string;
  siret: string;
  IBAN: string;
  skills: string[];
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  companyName?: string;
  siret?: string;
  IBAN?: string;
  skills?: string;
}

export function SignupArtisanForm() {
  const [form, setForm] = useState<ArtisanFormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    companyName: "",
    siret: "",
    IBAN: "",
    skills: [],
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({})
  const [isValid, setIsValid] = useState(true)

  function validate(form: ArtisanFormState): void {
    const errors: FormErrors = {};

    if (!form.firstName.trim()) errors.firstName = "Le prénom est requis.";

    if (!form.lastName.trim()) errors.lastName = "Le nom est requis.";

    if (!form.email.includes("@")) errors.email = "Email invalide.";

    if (!/^(\+33|0)[1-9](\d{8})$/.test(form.phone.replace(/\s/g, "")))
      errors.phone = "Téléphone invalide. Ex : 06 12 34 56 78";

    if (form.password.length < 8)
      errors.password = "Mot de passe : 8 caractères minimum.";

    if (!form.companyName.trim()) errors.companyName = "Nom de société requis.";

    if (!/^\d{14}$/.test(form.siret.replace(/\s/g, "")))
      errors.siret = "SIRET invalide (14 chiffres).";

    if (!/^FR\d{2}[A-Z0-9]{23}$/.test(form.IBAN.replace(/\s/g, "")))
      errors.IBAN = "IBAN invalide. Ex : FR76 3000 6000 0112 3456 7890 189";

    if (form.skills.length === 0)
      errors.skills = "Ajoutez au moins une compétence.";

    setErrors(errors);
  }

  const update = (field: keyof ArtisanFormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    // Validation
    validate(form)
    setIsValid(Object.keys(errors).length === 0);
    if (!isValid) return;

    setSubmitted(true);
    console.log("Formulaire soumis :", form); // ici use case
  };

  if (submitted) {
    return (
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 text-center">
        <p className="text-teal-700 font-semibold text-lg">✅ Compte créé !</p>
        <p className="text-sm text-slate-500 mt-1">
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
        disabled={!isValid}
        className="py-3 rounded-xl font-semibold text-white transition-all
          bg-teal-500 hover:bg-teal-600
          disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Créer mon compte artisan
      </button>
    </form>
  );
}
