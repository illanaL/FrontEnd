interface Props {
  step: number;
  prevStep: () => void;
  nextStep: () => void;
  canGoNext: boolean;
  form?: string;
  type?: "button" | "submit";
}

export const StepButton = ({ step, prevStep, nextStep, canGoNext, form, type="button" }: Props) => {
  console.log({ step, canGoNext, type, form });
  return (
    <div className={`flex ${step === 0 ? "justify-end" : "justify-between"}`}>
      {step > 0 && (
        <button
        type="button"
          disabled={step === 0}
          onClick={prevStep}
          className="px-5 py-2.5 rounded-xl border border-sos-200 text-sos-700 font-medium
            hover:bg-sos-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Retour
        </button>
      )}
      {step < 3 && (
        <button
        type={type}
        form={form}
        // Si c'est un bouton "submit", on ne met pas de onClick, le navigateur gère la soumission du formulaire automatiquement.
        // Si c'est un bouton "button", on appelle la fonction nextStep habituelle.
        onClick={type === "submit" ? undefined : nextStep}
        disabled={step === 3 || !canGoNext}
        className={`px-5 py-2.5 rounded-xl bg-sos-700 text-white font-semibold
            hover:bg-sos-800 shadow-md hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
              !canGoNext ? "opacity-40 cursor-not-allowed" : ""
            }`}  
          
        >
         {step === 2 ? "Continuer vers la vérification →" : "Suivant →"}
        </button>
      )}
    </div>
  );
};
