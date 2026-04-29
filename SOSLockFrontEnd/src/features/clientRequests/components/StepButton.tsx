interface Props {
  step: number;
  prevStep: () => void;
  nextStep: () => void;
  canGoNext: boolean;
}

export const StepButton = ({ step, prevStep, nextStep, canGoNext }: Props) => {
  return (
    <div className={`flex ${step === 0 ? "justify-end" : "justify-between"}`}>
      {step > 0 && (
        <button
          disabled={step === 0}
          onClick={prevStep}
          className="px-5 py-2.5 rounded-xl border border-teal-200 text-teal-700 font-medium
            hover:bg-teal-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Retour
        </button>
      )}
      {step < 3 && (
        <button
          disabled={step === 3}
          onClick={nextStep}
          className={`px-5 py-2.5 rounded-xl bg-teal-700 text-white font-semibold
            hover:bg-teal-800 shadow-md hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed ${!canGoNext ? "opacity-40 cursor-not-allowed" : ""}`}
        >
          Suivant →
        </button>
      )}
    </div>
  );
};
