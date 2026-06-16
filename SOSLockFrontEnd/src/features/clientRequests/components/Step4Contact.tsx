import { useState } from "react";
import { ImageUpload } from "./ImageUpload";
import { useClientRequestStore } from "../stores/useClientRequestStore";
import { clientRequestFormSchema } from "../schema/filter.schema";
import { createClientRequest } from "../api/clientRequest.api";
import { signUpUser } from "../../user/api/users.api";

type SubmitErrors = Partial<Record<string, string>>;

export const Step4Contact = () => {
  const formData = useClientRequestStore((s) => s.formData);
  const reset = useClientRequestStore((s) => s.reset);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<SubmitErrors>({});

  const handleSubmit = async () => {
    setSubmitError(null);
    setValidationErrors({});

    const result = clientRequestFormSchema.safeParse(formData);

    if (!result.success) {
      const errors: SubmitErrors = {};
      result.error.issues.forEach((err) => {
        const key = err.path.join(".");
        errors[key] = err.message;
      });
      setValidationErrors(errors);
      return;
    }

    const data = result.data;
    setIsSubmitting(true);

    try {
      const user = await signUpUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: "password",
      });

      const response = await createClientRequest({
        userId: user.id,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        addressRequest: data.addressRequest,
        description: data.description ?? "",
        photos: data.photos ?? [],
        preferredDate: data.preferredDate
          ? new Date(data.preferredDate)
          : new Date(),
        isUrgent: data.isUrgent,
        productIds: data.productIds,
      });

      reset();

      // Redirection vers Stripe Checkout
      window.location.href = response.checkoutUrl;
    } catch (err: any) {
      setSubmitError(
        err.message ?? "Une erreur est survenue, veuillez réessayer.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactFields = ["firstName", "lastName", "phone", "email"];
  const addressFields = [
    "addressRequest.number",
    "addressRequest.street",
    "addressRequest.zipCode",
    "addressRequest.city",
  ];

  const contactErrors = contactFields.filter((f) => validationErrors[f]);
  const addressErrors = addressFields.filter((f) => validationErrors[f]);
  const stepErrors = [
    validationErrors["categoryId"] &&
      "Étape 1 : " + validationErrors["categoryId"],
    validationErrors["productIds"] &&
      "Étape 2 : " + validationErrors["productIds"],
    ...contactErrors.map((f) => "Étape 3 : " + validationErrors[f]),
    ...addressErrors.map((f) => "Étape 3 : " + validationErrors[f]),
  ].filter(Boolean) as string[];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-base font-semibold text-text">
          Photos de la situation
        </h2>
        <p className="text-sm text-text/50 mt-0.5">
          Optionnel — aidez le prestataire à mieux comprendre votre besoin.
        </p>
      </div>

      <ImageUpload />

      {/* Récap des erreurs de validation des étapes précédentes */}
      {stepErrors.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 flex flex-col gap-1">
          <p className="text-sm font-medium text-red-700">
            Des informations sont manquantes ou incorrectes :
          </p>
          <ul className="list-disc list-inside">
            {stepErrors.map((msg, i) => (
              <li key={i} className="text-xs text-red-600">
                {msg}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Erreur serveur */}
      {submitError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-700">{submitError}</p>
        </div>
      )}

      {/* Récap rapide avant envoi */}
      <div className="rounded-xl border border-border bg-bg-soft px-4 py-3 flex flex-col gap-1 text-sm text-text/70">
        <p className="font-medium text-text mb-1">Récapitulatif</p>
        <p>
          <span className="text-text/40">Nom :</span>
          {formData.lastName.toUpperCase()}{" "}
          {formData.firstName.charAt(0).toUpperCase() +
            formData.firstName.slice(1).toLowerCase()}
        </p>
        <p>
          <span className="text-text/40">Prestations :</span>{" "}
          {formData.productIds.length} sélectionnée
          {formData.productIds.length > 1 ? "s" : ""}
        </p>
        {formData.isUrgent && (
          <p>
            <span className="text-text/40">Urgence : </span>
            Oui 🚨
          </p>
        )}

        {formData.photos && formData.photos.length > 0 && (
          <p>
            <span className="text-text/40">Photos : </span>
            {formData.photos.length} ajoutée
            {formData.photos.length > 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Bouton de soumission */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            Envoi en cours…
          </>
        ) : (
          <>
            Confirmer et payer
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};
