const STEPS = [
  "Mon problème",
  "Ma prestation",
  "Mes coordonnées",
  "Confirmation",
];

interface Props {
  currentStep: number;
}

export const StepIndicator = ({ currentStep }: Props) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all
              ${
                i < currentStep
                  ? "bg-green-500 text-white"
                  : i === currentStep
                    ? "bg-teal-700 text-white"
                    : "bg-teal-100 text-teal-400"
              }`}
            >
              {i < currentStep ? "✓" : i + 1}
            </div>
            <span
              className={`text-xs whitespace-nowrap
              ${
                i < currentStep
                  ? "text-green-600 font-medium"
                  : i === currentStep
                    ? "text-teal-700 font-semibold"
                    : "text-teal-400"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-10 h-0.5 mb-5 transition-all
              ${i < currentStep ? "bg-green-500" : "bg-teal-200"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};
