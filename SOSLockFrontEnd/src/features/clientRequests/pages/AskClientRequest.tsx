import { Step1Category } from "../components/Step1Category";
import { Step2Products } from "../components/Step2Products";
import { Step3Contact } from "../components/Step3Contact";
import { StepButton } from "../components/StepButton";
import { StepIndicator } from "../components/StepIndicator";
import { useClientRequestStore } from "../stores/useClientRequestStore";

export default function AskClientRequest() {
  const step = useClientRequestStore((state) => state.step);
  const formData = useClientRequestStore((state) => state.formData);
  const productIds = useClientRequestStore(
    (state) => state.formData.productIds,
  );
  const update = useClientRequestStore((state) => state.update);
  const nextStep = useClientRequestStore((state) => state.nextStep);
  const prevStep = useClientRequestStore((state) => state.prevStep);
  const reset = useClientRequestStore((state) => state.reset);

  // Vérification de la validité locale pour activer/désactiver le bouton "Suivant" global
  const canGoNext = () => {
    if (step === 0)
      return formData.categoryId !== null && formData.categoryId !== undefined;
    if (step === 1) return productIds.length > 0;

    if (step === 2) return true;

    return true;
  };

  return (
    <div className="min-h-screen bg-bg-soft">
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-text">
              Demande d'intervention
            </h1>
            <p className="text-sm text-text/50 mt-1">
              Simple, rapide — en quelques clics
            </p>
          </div>
          <button
            onClick={reset}
            className="text-sm text-text/40 hover:text-red-400 border border-border hover:border-red-300 px-3 py-1.5 rounded-lg transition-all"
          >
            🔄 Réinitialiser
          </button>
        </div>

        <StepIndicator currentStep={step} />

        <div className="bg-bg rounded-2xl shadow-sm border border-border p-6">
          {step === 0 && <Step1Category formdata={formData} update={update} />}
          {step === 1 && <Step2Products formdata={formData} update={update} />}
          {step === 2 && (
            <Step3Contact
              formdata={formData}
              update={update}
              onNext={nextStep}
            />
          )}
          {step === 3 && (
            <p className="text-text/50 text-center py-10">
              4ème étape — à venir
            </p>
          )}
        </div>

        {/* Ton StepButton reste intact et s'adapte automatiquement */}
        <StepButton
          step={step}
          prevStep={prevStep}
          nextStep={nextStep}
          canGoNext={canGoNext()}
          form={step === 2 ? "contact-step-form" : undefined}
          type={step === 2 ? "submit" : "button"}
        />
      </div>
    </div>
  );
}
