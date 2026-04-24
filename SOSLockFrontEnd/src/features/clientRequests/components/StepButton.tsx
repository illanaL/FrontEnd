interface Props {
  step: number;
  prevStep: () => void;
  nextStep: () => void;
}

export const StepButton = ({ step, prevStep, nextStep }: Props) => {
  return (
    <>
      <div className={`flex ${step === 0 ? "justify-end" : "justify-between"}`}>
        {step > 0 && (
          <button
            disabled={step === 0}
            onClick={prevStep}
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-medium
        hover:bg-gray-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Retour
          </button>
        )}
        {step < 3 && (
          <button
            disabled={step === 3}
            onClick={nextStep}
            className="px-5 py-2.5 rounded-xl bg-amber-700 text-white font-semibold
        hover:bg-amber-800 shadow-md hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Suivant →
          </button>
        )}
      </div>
    </>
  );
};
