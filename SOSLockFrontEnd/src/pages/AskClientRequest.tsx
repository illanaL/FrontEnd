import { Step1Category } from "../features/clientRequests/components/Step1Category";
import { StepButton } from "../features/clientRequests/components/StepButton";
import { StepIndicator } from "../features/clientRequests/components/StepIndicator";
import { useClientRequestForm } from "../features/clientRequests/hooks/useClientRequestForm";

export const AskClientRequest = () => {
  const { formData, update, step, prevStep, nextStep } = useClientRequestForm();

  return (
    <div>
      <h1 className="text-center">Demande d'intervention</h1>
      <h4 className="text-center">Simple, rapide — en quelques clics</h4>
      <StepIndicator currentStep={step} />
      {step === 0 && <Step1Category formdata={formData} update={update} />}
      {step === 1 && <p>2ème étape</p>}
      {step === 2 && <p>3ème étape</p>}
      {step === 3 && <p>4ème étape</p>}
      <StepButton step={step} prevStep={prevStep} nextStep={nextStep} />
      console.log(Step: {step})
    </div>
  );
};