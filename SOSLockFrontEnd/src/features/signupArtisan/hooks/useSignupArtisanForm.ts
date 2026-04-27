import { useState } from "react";

import { validate } from "../validation/signupArtisanValidation";
import type { ArtisanFormState, FormErrors } from "../type/signupArtisan.types";

const initialState: ArtisanFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  companyName: "",
  siret: "",
  IBAN: "",
  skills: [],
  departments: []
};

export function useSignupArtisanForm() {
  const [form, setForm] = useState<ArtisanFormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof ArtisanFormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setSubmitted(true);
    console.log("Formulaire soumis :", form);
  };

  return { form, setForm, errors, submitted, update, handleSubmit };
}
