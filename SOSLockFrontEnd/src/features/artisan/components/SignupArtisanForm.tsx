import { useState } from "react";
import { SignupArtisanStepOneForm } from "./SignupArtisanStepOneForm";
import { SignupArtisanFormStepTwoForm } from "./SignupArtisanStepTwoForm";
import { SignupArtisanStepThreeForm } from "./SignupArtisanStepThreeForm";

type Step = 1 | 2 | 3;

const STEP_LABELS = ["Identité", "Entreprise", "Confirmation"];

export function SignupArtisanForm() {
  const [step, setStep] = useState<Step>(1);

  return (
    <div className="flex flex-col gap-6">

   
      <div className="flex items-center gap-2">
        {STEP_LABELS.map((label, i) => {
          const num = (i + 1) as Step;
          const isActive    = step === num;
          const isCompleted = step > num;
          return (
            <div key={num} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive    ? "text-primary" :
                isCompleted ? "text-green-600" : "text-gray-400"
              }`}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                  isActive    ? "border-primary text-primary bg-white" :
                  isCompleted ? "border-green-600 bg-green-600 text-white" :
                                "border-gray-200 text-gray-400"
                }`}>
                  {isCompleted ? "✓" : num}
                </span>
                {label}
              </div>
          
              {i < STEP_LABELS.length - 1 && (
                <div className={`h-px w-8 ${step > num ? "bg-green-400" : "bg-gray-200"}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Étapes */}
      {step === 1 && <SignupArtisanStepOneForm     onNext={() => setStep(2)} />}
      {step === 2 && <SignupArtisanFormStepTwoForm  onNext={() => setStep(3)} />}
      {step === 3 && <SignupArtisanStepThreeForm />}
    </div>
  );
}