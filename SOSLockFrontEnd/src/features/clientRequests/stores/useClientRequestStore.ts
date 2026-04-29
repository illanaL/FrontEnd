import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { ClientRequestFormData } from "../clientRequest.types";

const MAX_STEP = 3;

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

interface ClientRequestStoreState {
  step: number;
  formData: ClientRequestFormData;
  update: (field: keyof ClientRequestFormData, value: unknown) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

export const useClientRequestStore = create<ClientRequestStoreState>()(
  devtools(
    persist(
      (set) => ({
        step: 0,
        formData: INITIAL_STATE,

        update: (field, value) =>
          set(
            (state) => ({
              formData: { ...state.formData, [field]: value },
            }),
            false,
            "update",
          ),

        nextStep: () =>
          set(
            (state) => ({ step: Math.min(MAX_STEP, state.step + 1) }),
            false,
            "nextStep",
          ),

        prevStep: () =>
          set(
            (state) => ({ step: Math.max(0, state.step - 1) }),
            false,
            "prevStep",
          ),

        reset: () => set({ step: 0, formData: INITIAL_STATE }, false, "reset"),
      }),
      {
        name: "soslock-client-request",
        partialize: (state) => ({
          step: state.step,
          formData: state.formData,
        }),
      },
    ),
    { name: "ClientRequestStore" },
  ),
);
