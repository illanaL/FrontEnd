import type { ArtisanFormState, FormErrors } from "../type/signupArtisan.types";


export function validate(form: ArtisanFormState): FormErrors {
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
  if (form.departments.length === 0)
  errors.departments = "Sélectionnez au moins un département.";
  
  return errors; 
}