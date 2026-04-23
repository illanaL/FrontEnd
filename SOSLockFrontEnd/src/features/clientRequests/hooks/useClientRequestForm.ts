
import { useState } from "react";
import type { ClientRequestFormData } from "../clientRequest.types";


const INITIAL_STATE: ClientRequestFormData = {
  categoryId: "",
  productIds: [],
  isUrgent: false,
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  addressRequest: {
    number: "",
    street: "",
    zipCode: "",
    city: "",
  },
  description: "",
  preferredDate: undefined,
  photos: [],
};

export const useClientRequestForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<ClientRequestFormData>(INITIAL_STATE);

  const update = (field: keyof ClientRequestFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return {
    step,
    formData,
    update,
    nextStep,
    prevStep,
  };
};